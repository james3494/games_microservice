module.exports = {
  buildPatchTakeoutMethod({
    editTakeoutMethod,
    filterTakeouts,
    throwError,
    getLoggedIn,
  }) {
    return async function (httpRequest) {
      const { description } = httpRequest.body;
      const { _id } = httpRequest.params;
      const loggedIn = httpRequest.user;

      if (!loggedIn._id) {
        throwError({
          title: "You must be logged in to edit a takeoutMethod.",
          error: "takeoutMethod-not-logged-in",
          status: 403,
        });
      }
      if (!loggedIn.admin.takeout && !loggedIn.admin.super) {
        throwError({
          title: "You must be an admin to edit a takeoutMethod.",
          error: "takeoutMethod-insufficient-admin",
          status: 403,
        });
      }

      const takeouts = await filterTakeouts({
        takeoutMethodId: _id,
      });
      if (takeouts.length > 0) {
        throwError({
          status: 403,
          title:
            "You may not edit a takeoutMethod which has already been played. If desired, disable this and create another one in the pack.",
          error: "takeoutMethod-already-played",
        });
      }

      const { modifiedCount } = await editTakeoutMethod({
        _id,
        ...(description ? { description } : {}),
      });

      return {
        headers: { "Content-Type": "application/json" },
        status: 200,
        body: { modified: modifiedCount >= 1 },
      };
    };
  },
};
