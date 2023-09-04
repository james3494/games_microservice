const { makeGame } = require("../entities");

module.exports = {
  makeDeclineGameInvitation({ gamesDb, throwError }) {
    return async function ({ _id, user_id }) {
      if (!_id) {
        throwError({
          title: "You must supply a game _id to accept a game invitation.",
          error: "game-invalid-id",
          status: 400,
        });
      }
      if (!user_id) {
        throwError({
          title: "You must supply a user _id to accept a game invitation.",
          error: "game-invalid-user-id",
          status: 400,
        });
      }

      const game = await gamesDb.findById({ _id });
      if (!game) {
        throwError({
          title: "No game found with that id.",
          error: "game-not-found",
          status: 404,
        });
      }
      if (!game.invited.includes(user_id)) {
        throwError({
          title: "The specified user is not invited to the specified game.",
          error: "game-user-not-invited",
          status: 403,
        });
      }

      const toEdit = makeGame({
        ...game,
        invited: game.invited.filter(el => el !== user_id),
      });

      return await gamesDb.update({
        _id,
        invited: toEdit.getInvited(),
      });
    };
  },
};
