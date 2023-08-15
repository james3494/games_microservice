const { makeGame } = require("../entities");

module.exports = {
  makeFilterGames({ gamesDb, throwError }) {
    return async function ({ ...filters }) {
      if (typeof filters !== "object") {
        throwError({
          title: "Invalid filters.",
          error: "filters-not-object",
          status: 400,
          detail: "The filters parameter must be an object",
        });
      }

      const fromDb = await gamesDb.smartFilter(filters);

      let rtn = [];
      // do try catch statements in a loop to prevent it dying if there's one corrupt game
      (fromDb || []).forEach((gameInfo) => {
        try {
          const game = makeGame(gameInfo);
          rtn.push(game.getAll());
        } catch (e) {
          console.log(e);
        }
      });
      return rtn;
    };
  },
};
