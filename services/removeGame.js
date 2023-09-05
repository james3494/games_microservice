const { makeGame } = require('../entities');

module.exports = {
   makeRemoveGame ({ gamesDb, filterTakeouts, removeTakeouts, throwError }) {
    return async function ({ _id }) {
      const existingGame = await gamesDb.findById({ _id });

      if (!existingGame) {
        throwError({ 
            title: "No game found to delete.", 
            error:  "game-not-found", 
            status: 404, 
            detail: "No game found with the supplied _id"
          });
      }
      const game = makeGame(existingGame);
      const takeouts = await filterTakeouts({
        gameId: game.getId()
      })

      await removeTakeouts({ _idArray: takeouts.map(takeout => takeout._id) })

      const { deletedCount } = await gamesDb.remove({
         _id: game.getId()
      });

      if (deletedCount < 1) {
        throwError({ 
            title: "Failed to delete game.", 
            error:  "game-not-deleted", 
            status: 400, 
            detail: "The database responded with a deleted count <1"
          });
      }
      return { deletedCount, deletedId: _id };

    };
  }
};
