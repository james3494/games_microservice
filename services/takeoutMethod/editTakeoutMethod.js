const { makeTakeoutMethod } = require('../../entities');

module.exports = {
  makeEditTakeoutMethod ({ takeoutMethodsDb, throwError }) {
    return async function ({ ...takeoutMethodInfo }) {
      if (!takeoutMethodInfo._id) {
        throwError({
          title: `You must supply an id to edit a takeoutMethod.`,
          error: "takeoutMethod-invalid-id",
          status: 400,
        });
      }

      const takeoutMethod = await takeoutMethodsDb.findById({ _id: takeoutMethodInfo._id });
      if (!takeoutMethod) {
        throwError({
          title: `No takeoutMethod found with that _id.`,
          error: "takeoutMethod-not-found",
          status: 404,
        });
      }

      const toEdit = makeTakeoutMethod({ ...takeoutMethod, ...takeoutMethodInfo });

      return await takeoutMethodsDb.update({
        _id: toEdit.getId(),
        disabled: toEdit.isDisabled(),
        description: toEdit.getDescription(),
        modifiedOn: Date.now(),
      });
    };
  }
} ;
