const { makeHitMethod } = require('../entities');

module.exports = {
   makeCreateHitMethod ({ takeoutMethodsDb }) {
    return async function ({ ...hitMethodParams }) {
      const hitMethod = makeHitMethod({ ...hitMethodParams });

      return await takeoutMethodsDb.insert({
        ... hitMethod.getAll()
      });
    };
  }
};
