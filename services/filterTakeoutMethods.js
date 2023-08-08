const { makeTakeoutMethod } = require('../entities');

// expects filters to be a mongodb style object. A bit bad that we need mongo specific code now floating around elsewhere

module.exports = {
   makeFilterTakeoutMethods ({ takeoutMethodsDb, throwError }) {
    return async function ({ ...filters }) {

      if (typeof filters !== 'object') {
        throwError("Filters must be an object.", 400);
      }

      const takeoutMethodInfos = await takeoutMethodsDb.customFind(filters);

      let takeoutMethodsRtn = [];
      // do try catch statements in a loop to prevent it dying if there's one corrupt takeoutMethod
      (takeoutMethodInfos || []).forEach(takeoutMethodInfo => {
        try {
          const takeoutMethod = makeTakeout(takeoutMethodInfo);
          takeoutMethodsRtn.push( takeoutMethod.getAll() );
        } catch (e) {
          console.log(e);
        }
      });
      return takeoutMethodsRtn;
    };

  }
};
