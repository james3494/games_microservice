const { makeHitMethod } = require('../entities');

module.exports = {
   makeAddHitMethod ({ hitMethodsDb }) {
    return async function ({ ...hitMethodParams }) {
      const hitMethod = makeHitMethod({ ...hitMethodParams });

      return hitMethodsDb.insert({
        ... hitMethod.getAll()
      });
    };
  }
};
