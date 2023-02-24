const { makeHitMethod } = require('../entities');

module.exports = {
  makeEditHitMethod ({ hitMethodDb, throwError }) {
    return async function ({ ...hitMethodInfo }) {
      if (!hitMethodInfo._id) {
        throwError('You must supply an id to edit a hitMethod.', 400);
      }

      const hitMethod = await hitMethodDb.findById({ _id: hitMethodInfo._id });
      if (!hitMethod) {
        throwError("No hitMethod found to edit.", 400);
      }

      const toEdit = makeHitMethod({ ...hitMethod, ...hitMethodInfo });

      const updated = await hitMethodDb.update({
        _id: toEdit.getId(),
        description: toEdit.getDescription(),
        difficulty: toEdit.getDifficulty(),
        themes: toEdit.getThemes(),
        modifiedOn: Date.now(),
      });
      if (!updated) throwError("Error editing hitMethod", 500)

      return { ...updated };
    };
  }
} ;
