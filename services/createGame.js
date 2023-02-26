const { makeGame } = require('../entities');

module.exports = {
   makeCreateGame ({ gamesDb }) {
    return async function ({ ...gameInfo }) {
      const game = makeGame({ ...gameInfo });

      return await gamesDb.insert({
        ... game.getAll()
      });
    };
  }
};
