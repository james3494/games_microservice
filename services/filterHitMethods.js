const { makeHitMethod } = require('../entities');

// expects filters to be a mongodb style object. A bit bad that we need mongo specific code now floating around elsewhere

module.exports = {
   makeFilterHitMethods ({ takeoutMethodsDb, throwError }) {
    return async function ({ ...filters }) {

      if (typeof filters !== 'object') {
        throwError("Filters must be an object.", 400);
      }

      const hitMethodInfos = await takeoutMethodsDb.customFind(filters);

      let hitMethodsRtn = [];
      // do try catch statements in a loop to prevent it dying if there's one corrupt hitMethod
      (hitMethodInfos || []).forEach(hitMethodInfo => {
        try {
          const hitMethod = makeHit(hitMethodInfo);
          hitMethodsRtn.push( hitMethod.getAll() );
        } catch (e) {
          console.log(e);
        }
      });
      return hitMethodsRtn;
    };

  }
};
