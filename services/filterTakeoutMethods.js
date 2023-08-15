const { makeTakeoutMethod } = require("../entities");

module.exports = {
  makeFilterTakeoutMethods({ takeoutMethodsDb, throwError }) {
    return async function ({ ...filters }) {
      if (typeof filters !== "object") {
        throwError({
          title: "Invalid filters.",
          error: "filters-not-object",
          status: 400,
          detail: "The filters parameter must be an object",
        });
      }

      const fromDb = await takeoutMethodsDb.smartFilter(filters);

      let rtn = [];
      // do try catch statements in a loop to prevent it dying if there's one corrupt takeoutMethod
      (fromDb || []).forEach((takeoutMethodInfo) => {
        try {
          const takeoutMethod = makeTakeoutMethod(takeoutMethodInfo);
          rtn.push(takeoutMethod.getAll());
        } catch (e) {
          console.log(e);
        }
      });
      return rtn;
    };
  },
};
