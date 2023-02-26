const { makeHit } = require('../entities');

// expects filters to be a mongodb style object. A bit bad that we need mongo specific code now floating around elsewhere

module.exports = {
   makeFilterHits ({ hitsDb, throwError }) {
    return async function ({ ...filters }) {

      if (typeof filters !== 'object') {
        throwError("Filters must be an object.", 400);
      }

      const hitInfos = await hitsDb.customFind(filters);

      let hitsRtn = [];
      // do try catch statements in a loop to prevent it dying if there's one corrupt hit
      (hitInfos || []).forEach(hitInfo => {
        try {
          const hit = makeHit(hitInfo);
          hitsRtn.push( hit.getAll() );
        } catch (e) {
          console.log(e);
        }
      });
      return hitsRtn;
    };

  }
};
