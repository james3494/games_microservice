module.exports = {
  buildPatchGamePlayers({ joinGame, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { _id, joinLink } = httpRequest.params;
      const loggedIn = getLoggedIn(httpRequest);

      if (!loggedIn) {
        throwError({
          title: "You must be logged in to join a game.",
          error: "game-not-logged-in",
          status: 403,
        });
      }

      const { modifiedCount } = await joinGame({
        _id,
        joinLink,
        user_id: loggedIn._id,
      });

      return {
        headers: { "Content-Type": "application/json" },
        status: 201,
        body: { modifiedCount, success: modifiedCount > 0 },
      };
    };
  },
};
