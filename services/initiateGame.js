const { makeGame } = require('../entities');

module.exports = {
   makeInitiateGame ({ gamesDb, throwError, filterHitMethods, createHit, editGame, shuffleArray }) {
    return async function ({ _id }) {
      const gameInfo = await gamesDb.findById({ _id });
      if (!gameInfo) {
        throwError("No game found to initiate.", 400);
      }
      const game = makeGame({ ...gameInfo });
      const players = game.getPlayers();

      const potentialHitMethods = await filterHitMethods({
        difficulty: game.getDifficulty(),
        themes: game.getTheme()
      });

      if (players.length > potentialHitMethods.length) {
        throwError("More players than available hitMethods.", 400);
      }

      // randomly order the players then choose a random hitMethod
      players = shuffleArray(players);
      let usedMethods = [];
      players.forEach((playerId, index) => {
        const rand = Math.floor( Math.random() * potentialHitMethods.length );
        createHit({
          chaserId: playerId,
          targetId: players[ (index + 1) % players.length ],
          gameId: _id,
          hitMethodId: potentialHitMethods[rand]._id,
          status: 'inProgress'
        })
        potentialHitMethods.splice(rand, 1);
      })


      editGame({
        _id,
        status: 'inProgress',
        startTime: Date.now(),
      })
    };
  }
};
