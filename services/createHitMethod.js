const { makeHitMethod } = require('../entities');

module.exports = {
   makeCreateHitMethod ({ takeOutMethodsDb }) {
    return async function ({ ...hitMethodParams }) {
      const hitMethod = makeHitMethod({ ...hitMethodParams });

      return await takeOutMethodsDb.insert({
        ... hitMethod.getAll()
      });
    };
  }
};
