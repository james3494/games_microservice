const { makeTakeout } = require('../entities');

// expects filters to be a mongodb style object. A bit bad that we need mongo specific code now floating around elsewhere

module.exports = {
   makeFilterTakeouts ({ takeoutsDb, throwError }) {
    return async function ({ ...filters }) {

      if (typeof filters !== 'object') {
        throwError({
          title: `Incorrect filters.`,
          error: "filters-not-object",
          status: 400,
          detail: 'filters should be a mongodb style object'
        });
      }

      const takeoutInfos = await takeoutsDb.customFind(filters);

      let takeoutsRtn = [];
      // do try catch statements in a loop to prevent it dying if there's one corrupt takeout
      (takeoutInfos || []).forEach(takeoutInfo => {
        try {
          const takeout = makeTakeout(takeoutInfo);
          takeoutsRtn.push( takeout.getAll() );
        } catch (e) {
          console.log(e);
        }
      });
      return takeoutsRtn;
    };

  }
};
