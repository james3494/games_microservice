const { makeGame } = require("../entities");

module.exports = {
  makeLeaveGame({ gamesDb, throwError }) {
    return async function ({ _id, user_id }) {
      if (!_id) {
        throwError({
          title: "You must supply a game _id to leave a game.",
          error: "game-invalid-id",
          status: 400,
        });
      }
      if (!user_id) {
        throwError({
          title: "You must supply a user _id to leave a game.",
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
      const playerInGame = game.players.includes(user_id);
      const playerInvitedToGame = game.invited.includes(user_id);
      
      if (!playerInGame && !playerInvitedToGame) {
        throwError({
          title: "You must be either a part of or invited to a game to leave it.",
          error: "game-invalid-joinLink",
          status: 403,
        });
      }
      if (game.status !== 'awaiting') {
        throwError({
          title: "You cannot leave a game which has already started.",
          error: "game-already-started",
          status: 403,
        });
      }

      const toEdit = makeGame({
        ...game,
        players: game.players.filter((el) => el !== user_id),
        admins: game.admins.filter((el) => el !== user_id),
        invited: game.invited.filter(el => el !== user_id),
      });

      return await gamesDb.update({
        _id,
        players: toEdit.getPlayers(),
        admins: toEdit.getAdmins(),
        invited: toEdit.getInvited()
      });
    };
  },
};
