const { makeTakeoutMethod } = require('../entities');

module.exports = {
   makeRemoveTakeoutMethod ({ takeoutMethodsDb, throwError }) {
    return async function ({ _id }) {
      const existingTakeoutMethod = await takeoutMethodsDb.findById({ _id });

      if (!existingTakeoutMethod) {
        throwError({ 
            title: "No takeoutMethod found to delete.", 
            error:  "takeoutMethod-not-found", 
            status: 404, 
            detail: "No takeoutMethod found with the supplied _id"
          });
      }
      const takeoutMethod = makeTakeoutMethod(existingTakeoutMethod);
      const { deletedCount } = await takeoutMethodsDb.remove({
         _id: takeoutMethod.getId()
      });

      if (deletedCount < 1) {
        throwError({ 
            title: "Failed to delete takeoutMethod.", 
            error:  "takeoutMethod-not-deleted", 
            status: 400, 
            detail: "The database responded with a deleted count <1"
          });
      }
      return { deletedCount, deletedId: _id };

    };
  }
};
