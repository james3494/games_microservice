const { makeHitMethod } = require('../entities');

module.exports = {
   makeAddHitMethod ({ hitMethodDb }) {
    return async function ({ ...hitMethodParams }) {
      const hitMethod = makeHitMethod({ ...hitMethodParams });

      return hitMethodDb.insert({
        ... hitMethod.getAll()
      });
    };
  }
};
