const { makeHitMethod } = require('../entities');

module.exports = {
   makeCreateHitMethod ({ hitMethodsDb }) {
    return async function ({ ...hitMethodParams }) {
      const hitMethod = makeHitMethod({ ...hitMethodParams });

      return await hitMethodsDb.insert({
        ... hitMethod.getAll()
      });
    };
  }
};
