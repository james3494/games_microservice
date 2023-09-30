const { makeTakeout } = require("../../entities");

module.exports = {
  makeFilterTakeouts({ takeoutsDb, throwError }) {
    return async function ({ ...filters }) {
      if (typeof filters !== "object") {
        throwError({
          title: "Invalid filters.",
          error: "filters-not-object",
          status: 400,
          detail: "The filters parameter must be an object",
        });
      }

      const fromDb = await takeoutsDb.smartFilter(filters);

      let rtn = [];
      // do try catch statements in a loop to prevent it dying if there's one corrupt takeout
      (fromDb || []).forEach((takeoutInfo) => {
        try {
          const takeout = makeTakeout(takeoutInfo);
          rtn.push(takeout.getAll());
        } catch (e) {
          console.log(e);
        }
      });
      return rtn;
    };
  },
};
