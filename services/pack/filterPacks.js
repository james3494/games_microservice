const { makePack } = require("../../entities");

module.exports = {
  makeFilterPacks({ packsDb, throwError }) {
    return async function ({ ...filters }) {
      if (typeof filters !== "object") {
        throwError({
          title: "Invalid filters.",
          error: "filters-not-object",
          status: 400,
          detail: "The filters parameter must be an object",
        });
      }

      const fromDb = await packsDb.smartFilter(filters);

      let rtn = [];
      // do try catch statements in a loop to prevent it dying if there's one corrupt pack
      (fromDb || []).forEach((packInfo) => {
        try {
          const pack = makePack(packInfo);
          rtn.push(pack.getAll());
        } catch (e) {
          console.log(e);
        }
      });
      return rtn;
    };
  },
};
