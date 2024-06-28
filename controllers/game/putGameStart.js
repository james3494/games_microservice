module.exports = {
  buildPutGameStart({ initiateGame, throwError, filterGames }) {
    return async function (httpRequest) {
      const { _id } = httpRequest.params;
      const loggedIn = httpRequest.user;

      if (!loggedIn) {
        throwError({
          title: "You must be logged in to initiate a game.",
          error: "game-not-logged-in",
          status: 403,
        });
      }

      const isAdmin = (await filterGames({ _id }))[0]?.admins?.includes(
        loggedIn._id
      );

      if (!isAdmin && !loggedIn.admin.super && !loggedIn.admin.takeout) {
        throwError({
          title: "You must be an admin to initiate a game.",
          error: "game-insufficient-admin",
          status: 403,
        });
      }

      const { modifiedCount } = await initiateGame({
        _id,
      });

      return {
        headers: { "Content-Type": "application/json" },
        status: 201,
        body: { modifiedCount, success: modifiedCount == 1 },
      };
    };
  },
};
