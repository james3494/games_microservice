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
      const game = await gamesDb.findById({ _id });
      if (!game) {
        throwError({
          title: "No game found with that id.",
          error: "game-not-found",
          status: 404,
        });
      }
      if (game.players.includes(user_id)) {
        throwError({
          title: "You cannot join a game you are already a player in.",
          error: "game-already-joined",
          status: 403,
        });
      }

      const joinLinkAcceptable = joinLink && game.joinLink !== joinLink;
      const invitedAcceptable = game.invited.includes(user_id);

      if (!joinLinkAcceptable && !invitedAcceptable) {
        throwError({
          title: "You must either supply a valid joinLink or be invited to join a game.",
          error: "game-user-not-invited",
          status: 403,
        });
      }

      if (game.status !== 'awaiting') {
        throwError({
          title: "You cannot join a game which has already started.",
          error: "game-already-started",
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
