const { makeTakeout } = require('../../entities');

// todo: manke removeMany database function and do not loop through the existingtaeouts, do in one go.

module.exports = {
   makeRemoveTakeouts ({ takeoutsDb, throwError }) {
    return async function ({ _idArray }) {
      const existingTakeouts = await takeoutsDb.smartFilter({ _id: _idArray });

      if (existingTakeouts.length !== _idArray.length) {
        throwError({ 
            title: "Not all takeouts found to delete.", 
            error:  "takeout-not-found", 
            status: 404, 
            detail: "Mismatch between number of takeouts searched for and number found"
          });
      }

      const { deletedCount } = await takeoutsDb.removeMany( existingTakeouts.map(takeout => takeout._id) )

      if (deletedCount !== _idArray.length) {
        throwError({ 
            title: "Failed to delete all takeouts.", 
            error:  "takeout-not-deleted", 
            status: 400, 
            detail: `The deletedCount (${deletedCount}) does not match the number of takeouts passed in (${_idArray.length})`
          });
      }


      return { deletedCount };

    };
  }
};
