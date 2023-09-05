const { makeGame } = require('../entities');

module.exports = {
   makeInitiateGame ({ gamesDb, throwError, filterTakeoutMethods, createTakeout, editGame, shuffleArray }) {
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
      let players = game.getPlayers();

      let potentialTakeoutMethods = await filterTakeoutMethods({
        difficulty: game.getDifficulty(),
        themes: game.getTheme(),
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

      // randomly order the players and takeoutMethods
      players = shuffleArray(players);
      potentialTakeoutMethods = shuffleArray(potentialTakeoutMethods);

      players.forEach(async (playerId, index) => {
        await createTakeout({
          chaserId: playerId,
          targetId: players[ (index + 1) % players.length ],
          gameId: _id,
          takeoutMethodId: potentialTakeoutMethods[index]._id,
          status: 'inProgress'
        })
      })


      return await editGame({
        _id,
        status: 'inProgress',
        startTime: Date.now(),
      })
    };
  }
};
