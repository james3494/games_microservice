module.exports = {
  buildPatchGamePlayers({ joinGame, leaveGame, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { _id, joinLink, leaveOrJoin } = httpRequest.params;
      const loggedIn = getLoggedIn(httpRequest);

      if (!loggedIn) {
        throwError({
          title: "You must be logged in to join / leave a game.",
          error: "game-not-logged-in",
          status: 403,
        });
      }

      const functionToUse = leaveOrJoin === 'join' ? joinGame : leaveGame;

      const { modifiedCount } = await functionToUse({
        _id,
        joinLink,
        user_id: loggedIn._id,
      });

      if (modifiedCount !== 1) {
        throwError({
          title: "There was an unknown error joining / leaving the game.",
          error: "game-unknown-error",
          status: 400,
        });
      }
      
      return {
        headers: { "Content-Type": "application/json" },
        status: 200
      };
    };
  },
};
