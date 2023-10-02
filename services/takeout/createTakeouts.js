const { makeTakeout } = require("../../entities");

module.exports = {
  makeCreateTakeouts({ takeoutsDb }) {
    return async function (takeoutsArr) {
      const takeouts = takeoutsArr.map((takeoutInfo) => {
        const takeout = makeTakeout({ ...takeoutInfo });
        return takeout.getAll();
      });

      return await takeoutsDb.insertMany(takeouts);
    };
  },
};
