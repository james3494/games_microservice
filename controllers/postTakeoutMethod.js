module.exports = {
  buildPostTakeoutMethod({ createTakeoutMethod, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { ...takeoutMethodInfo } = httpRequest.body;

      const { _id, admin } = getLoggedIn(httpRequest);
      if (!_id) {
        throwError({
          title: "You must be logged in to create a takeoutMethod.",
          error: "takeoutMethod-not-logged-in",
          status: 403,
        });
      }
      if (
        !admin?.takeout &&
        !admin?.super
      ) {
        throwError({
          title: "You must be an admin to create a takeoutMethod.",
          error: "takeoutMethod-insufficient-admin",
          status: 403,
        });
      }

      const { insertedId } = await createTakeoutMethod({
        createdBy: _id,
        ...takeoutMethodInfo,
      });

      return {
        headers: { "Content-Type": "application/json" },
        statusCode: 201,
        body: { insertedId },
      };
    };
  },
};
