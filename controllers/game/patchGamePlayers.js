module.exports = {
  buildPatchGamePlayers({ joinGame, leaveGame, throwError }) {
    return async function (httpRequest) {
      const { _id, leaveOrJoin } = httpRequest.params;
      let { user_id, joinLink } = httpRequest.query;
      const loggedIn = httpRequest.user;

      if (!loggedIn) {
        throwError({
          title: "You must be logged in to join / leave a game.",
          error: "game-not-logged-in",
          status: 403,
        });
      }

      // default to the logged in user
      if (!user_id) user_id = loggedIn._id;


      if (
        loggedIn._id !== user_id &&
        !loggedIn.admin.takeout &&
        !loggedIn.admin.super
      ) {
        throwError({
          title:
            "You must be an admin to join / leave games on behalf of others.",
          error: "game-insufficient-admin",
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
