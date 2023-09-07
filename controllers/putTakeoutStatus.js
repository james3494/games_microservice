module.exports = {
  buildPutTakeoutStatus({
    executeTakeout,
    throwError,
    getLoggedIn,
    filterTakeouts,
  }) {
    return async function (httpRequest) {
      const { _id } = httpRequest.params;
      const loggedIn = getLoggedIn(httpRequest);

      if (!loggedIn) {
        throwError({
          title: "You must be logged in to execute a takeout.",
          error: "takeout-not-logged-in",
          status: 403,
        });
      }
      const isTarget =
        (await filterTakeouts({ _id }))[0].targetId === loggedIn._id;

      // only the target can legitimise the takeout
      if (!isTarget && !loggedIn.admin.super && !loggedIn.admin.takeout) {
        throwError({
          title:
            "You must be an admin to execute a takeout which you are not the target of.",
          error: "game-insufficient-admin",
          status: 403,
        });
      }

      const { success } = await executeTakeout({
        _id,
      });

      return {
        headers: { "Content-Type": "application/json" },
        status: 200,
        body: { success },
      };
    };
  },
};
