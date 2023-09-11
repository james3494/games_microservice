module.exports = {
  buildPutTakeoutStatus({
    executeTakeout,
    throwError,
    getLoggedIn,
    filterTakeouts,
  }) {
    return async function (httpRequest) {
      let { _id } = httpRequest.params;
      const { gameId, targetId } = httpRequest.query;
      const loggedIn = getLoggedIn(httpRequest);

      if (!loggedIn) {
        throwError({
          title: "You must be logged in to execute a takeout.",
          error: "takeout-not-logged-in",
          status: 403,
        });
      }

      let takeout;
      if (!_id) {
        if (!gameId && !targetId) {
          throwError({
            title: "If no takeout _id is supplied, you must supply both a gameId and targetId.",
            error: "takeout-execute-insufficient-information",
            status: 401,
          });
        }
        takeout = await filterTakeouts({ gameId, targetId, status: 'inProgress' });
        if (takeout.length !== 1) {
          throwError({
            title: "No inProgress takeout found for that target and game.",
            error: "takeout-not-found",
            status: 404,
          });
        }
        takeout = takeout[0]
        // set _id to equal this takeout
        _id = takeout._id;
      }

      if (!takeout) takeout = (await filterTakeouts({ _id }))[0];

      const isTarget = takeout.targetId === loggedIn._id;

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
