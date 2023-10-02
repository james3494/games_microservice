
module.exports = {
  buildGetTakeoutMethod({ filterTakeoutMethods, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { secret, ...filters } = httpRequest.query;
      const { _id } = httpRequest.params;

      if (secret && secret === process.env.SECRET) {
        // skip the tests - this comes directly from another microservice
      } else {
        const loggedIn = getLoggedIn(httpRequest);
        if (!loggedIn) {
          throwError({
            title: "You must be logged in to get a takeoutMethod.",
            error: "takeoutMethod-not-logged-in",
            status: 403,
          });
        }
        if (!loggedIn.admin.takeout && !loggedIn.admin.super) {
          throwError({
            title: "You must be an admin to get a takeoutMethod.",
            error: "takeoutMethod-insufficient-admin",
            status: 403,
          });
        }  
      }

      let filterObj = {};
      if (_id) {
        filterObj = { _id };
      } else filterObj = filters;

      const filtered = await filterTakeoutMethods(filterObj);
      let body = filtered.map((takeoutMethod) => ({
        _id: takeoutMethod._id,
        description: takeoutMethod.description,
        packId: takeoutMethod.packId,
      }));

      if (_id) {
        if (body.length < 1) {
          throwError({
            status: 404,
            title: "TakeoutMethod not found with specified id",
            error: "takeoutMethod-not-found",
          });
        }
        body = body[0];
      }

      return {
        headers: { "Content-Type": "application/json" },
        status: 200,
        body,
      };
    };
  },
};
