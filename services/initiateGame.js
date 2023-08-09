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
      const players = game.getPlayers();

      const potentialTakeoutMethods = await filterTakeoutMethods({
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

      // randomly order the players then choose a random takeoutMethod
      players = shuffleArray(players);
      let usedMethods = [];
      players.forEach((playerId, index) => {
        const rand = Math.floor( Math.random() * potentialTakeoutMethods.length );
        createTakeout({
          chaserId: playerId,
          targetId: players[ (index + 1) % players.length ],
          gameId: _id,
          takeoutMethodId: potentialTakeoutMethods[rand]._id,
          status: 'inProgress'
        })
        potentialTakeoutMethods.splice(rand, 1);
      })


      editGame({
        _id,
        status: 'inProgress',
        startTime: Date.now(),
      })
    };
  }
};
