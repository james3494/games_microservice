const { makeGame } = require('../entities');

function shuffleArray(array) {
  let b = [...array];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

module.exports = {
   makeInitiateGame ({ gamesDb, throwError, filterTakeoutMethods, createTakeout, verifyPack }) {
    return async function ({ _id }) {
      const gameInfo = await gamesDb.findById({ _id });
      if (!gameInfo) {
        throwError({
          title: `No game found to initiate.`,
          error: "game-not-found",
          status: 404,
        });
      }
      const game = makeGame({ ...gameInfo });
      const status = game.getStatus();
      if (status !== 'awaiting') {
        throwError({
          title: `Game already started`,
          error: "game-already-started",
          status: 400,
          detail: "You cannot initiate a game which has already started"
        });
      }

      if (!verifyPack(game)) {
        throwError({
          title: `There are not the necessary permissions to use this pack for this game.`,
          error: "game-pack-error",
          status: 403,
          detail: "The game admin must have purchased / downloaded the pack."
        });
      }

      let players = game.getPlayers();

      let potentialTakeoutMethods = await filterTakeoutMethods({
        packId: game.getPackId(),
        disabled: false
      });

      if (players.length > potentialTakeoutMethods.length) {
        throwError({
          title: `More players than available takeoutMethods`,
          error: "game-insufficient-takeout-methods",
          status: 400,
          detail: "You could either ask an admin to add more takeoutMethods or reduce the size of the game."
        });
      }
      if (players.length < 2) {
        throwError({
          title: `You must have at least 2 players to start a game`,
          error: "game-insufficient-players",
          status: 400,
          detail: "You could invite more players to the game"
        });
      }

      // randomly order the players and takeoutMethods
      players = shuffleArray(players);
      potentialTakeoutMethods = shuffleArray(potentialTakeoutMethods);

      players.forEach(async (playerId, index) => {
        await createTakeout({
          chaserId: players[index],
          targetId: players[ (index + 1) % players.length ],
          gameId: _id,
          takeoutMethodId: potentialTakeoutMethods[index]._id,
          methodText: potentialTakeoutMethods[index].description,
          status: 'inProgress'
        })
      })


      return await gamesDb.update({
        _id,
        status: 'inProgress',
        startTime: Date.now(),
      });

    };
  }
};
