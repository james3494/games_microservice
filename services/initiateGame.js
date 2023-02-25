const { makeGame } = require('../entities');

module.exports = {
   makeInitiateGame ({ gamesDb, throwError, filterHitMethods, createHit, editGame }) {
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

      // if more players than hitmethods throw an error

      // randomly order the players then choose a random hitMethod
      editGame({
        status: 'inProgress',
        startTime: Date.now(),
        modifiedOn: Date.now()
      })
    };
  }
};
