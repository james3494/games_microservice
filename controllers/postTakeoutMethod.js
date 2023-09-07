module.exports = {
  buildPostTakeoutMethod({ createTakeoutMethod, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { ...takeoutMethodInfo } = httpRequest.body;

      const loggedIn= getLoggedIn(httpRequest);
      if (!getLoggedIn._id) {
        throwError({
          title: "You must be logged in to create a takeoutMethod.",
          error: "takeoutMethod-not-logged-in",
          status: 403,
        });
      }
      if (
        !loggedIn.admin.takeout &&
        !loggedIn.admin.super
      ) {
        throwError({
          title: "You must be an admin to create a takeoutMethod.",
          error: "takeoutMethod-insufficient-admin",
          status: 403,
        });
      }

      const { insertedId } = await createTakeoutMethod({
        createdBy: getLoggedIn._id,
        ...takeoutMethodInfo,
      });

      return {
        headers: { "Content-Type": "application/json" },
        status: 201,
        body: { insertedId },
      };
    };
  },
};
