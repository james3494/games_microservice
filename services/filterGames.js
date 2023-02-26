const { makeGame } = require('../entities');

// expects filters to be a mongodb style object. A bit bad that we need mongo specific code now floating around elsewhere

module.exports = {
   makeFilterGames ({ gamesDb, throwError }) {
    return async function ({ ...filters }) {

      if (typeof filters !== 'object') {
        throwError("Filters must be an object.", 400);
      }

      const gameInfos = await gamesDb.customFind(filters);

      let gamesRtn = [];
      // do try catch statements in a loop to prevent it dying if there's one corrupt game
      (gameInfos || []).forEach(gameInfo => {
        try {
          const game = makeHit(gameInfo);
          gamesRtn.push( game.getAll() );
        } catch (e) {
          console.log(e);
        }
      });
      return gamesRtn;
    };

  }
};
