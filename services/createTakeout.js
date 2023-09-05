const { makeTakeout } = require('../entities');

module.exports = {
   makeCreateTakeout ({ takeoutsDb }) {
    return async function ({ ...takeoutInfo }) {

      const takeout = makeTakeout({ ...takeoutInfo });

      return await takeoutsDb.insert({
        ... takeout.getAll()
      });
    };
  }
};
