const { makeTakeoutMethod } = require('../entities');

module.exports = {
  makeEditTakeoutMethod ({ takeoutMethodsDb, throwError }) {
    return async function ({ ...takeoutMethodInfo }) {
      if (!takeoutMethodInfo._id) {
        throwError('You must supply an id to edit a takeoutMethod.', 400);
      }

      const takeoutMethod = await takeoutMethodsDb.findById({ _id: takeoutMethodInfo._id });
      if (!takeoutMethod) {
        throwError("No takeoutMethod found to edit.", 400);
      }

      const toEdit = makeTakeoutMethod({ ...takeoutMethod, ...takeoutMethodInfo });

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
