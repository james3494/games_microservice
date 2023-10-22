// TODO: add error handling - i.e who can access this?

module.exports = {
  buildGetTakeout({ filterTakeouts, throwError, getLoggedIn, filterGames }) {
    return async function (httpRequest) {
      const { ...filters } = httpRequest.query;
      const { _id } = httpRequest.params;
      const loggedIn = getLoggedIn(httpRequest);
      const loggedInIsAdmin = loggedIn.admin.takeout || loggedIn.admin.super;

      let filterObj = {};
      if (_id) {
        filterObj = { _id };
      } else filterObj = filters;

      const foundTakeouts = await filterTakeouts(filterObj);
      let body = foundTakeouts
        .filter(async (takeout) => {
          // can get a takeout if:
          // a) you are an admin
          if (loggedInIsAdmin) return true;

          // b) you are the chaser or target
          if (loggedIn._id === takeout.chaserId) return true;
          if (loggedIn._id === takeout.targetId) return true;

          // c) you are part of the game and the status is success/fail
          const statusOk =
            takeout.status === "success" || takeout.status === "fail";
          const inGame = (
            await filterGames({ _id: takeout.gameId })
          )[0].players.includes(loggedIn._id);
          if (statusOk && inGame) return true;

          return false;
        })
        .map((takeout) => {
          if (
            loggedIn._id === takeout.targetId &&
            takeout.status === "inProgress"
          ) {
            return {
              _id: takeout._id,
              gameId: takeout.gameId,
              targetId: takeout.targetId,
              secret: takeout.secret,
            };
          } else {
            return {
              _id: takeout._id,
              gameId: takeout.gameId,
              chaserId: takeout.chaserId,
              targetId: takeout.targetId,
              takeoutMethodId: takeout.takeoutMethodId,
              methodText: takeout.methodText,
              status: takeout.status,
              completedAt: takeout.completedAt,
              startedAt: takeout.startedAt,
            };
          }
        });

      if (_id) {
        if (body.length < 1) {
          throwError({
            status: 404,
            title: "takeout not found with specified id",
            error: "takeout-not-found",
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
