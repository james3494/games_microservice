const { makeGame } = require("../entities");

module.exports = {
  makeJoinGame({ gamesDb, throwError }) {
    return async function ({ _id, joinLink, user_id }) {
      if (!_id) {
        throwError({
          title: "You must supply a game _id to join a game.",
          error: "game-invalid-id",
          status: 400,
        });
      }
      if (!user_id) {
        throwError({
          title: "You must supply a user _id to join a game.",
          error: "game-invalid-user-id",
          status: 400,
        });
      }
      if (!joinLink) {
        throwError({
          title: "You must supply a joinLink to join a game.",
          error: "game-invalid-joinLink",
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
      if (game.joinLink !== joinLink) {
        throwError({
          title: "The given joinLink does no match the joinLink for the game.",
          error: "game-invalid-joinLink",
          status: 403,
        });
      }

      const toEdit = makeGame({
        ...game,
        invited: game.invited.filter((el) => el !== user_id),
        players: game.players.concat(user_id),
      });

      return await gamesDb.update({
        _id,
        invited: toEdit.getInvited(),
        players: toEdit.getPlayers(),
      });
    };
  },
};
