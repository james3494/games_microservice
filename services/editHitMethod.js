const { makeHitMethod } = require('../entities');

module.exports = {
  makeEditHitMethod ({ takeoutMethodsDb, throwError }) {
    return async function ({ ...hitMethodInfo }) {
      if (!hitMethodInfo._id) {
        throwError('You must supply an id to edit a hitMethod.', 400);
      }

      const hitMethod = await takeoutMethodsDb.findById({ _id: hitMethodInfo._id });
      if (!hitMethod) {
        throwError("No hitMethod found to edit.", 400);
      }

      const toEdit = makeHitMethod({ ...hitMethod, ...hitMethodInfo });

      return await takeoutMethodsDb.update({
        _id: toEdit.getId(),
        description: toEdit.getDescription(),
        difficulty: toEdit.getDifficulty(),
        disabled: toEdit.isDisabled(),
        themes: toEdit.getThemes(),
        modifiedOn: Date.now(),
      });
    };
  }
} ;
