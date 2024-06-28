module.exports = {
  buildGetTakeoutMethod({
    filterTakeoutMethods,
    filterTakeouts,
    throwError,
  }) {
    return async function (httpRequest) {
      const { ...filters } = httpRequest.query;
      const { _id } = httpRequest.params;

      const loggedIn = httpRequest.user;
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

      let filterObj = {};
      if (_id) {
        filterObj = { _id };
      } else filterObj = filters;

      const filtered = await filterTakeoutMethods(filterObj);
      let body = await Promise.all(
        filtered.map(async (takeoutMethod) => ({
          _id: takeoutMethod._id,
          description: takeoutMethod.description,
          packId: takeoutMethod.packId,
          disabled: takeoutMethod.disabled,
          numberPlays: (
            await filterTakeouts({ takeoutMethodId: takeoutMethod._id })
          ).length,
        }))
      );

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
