const { makePackPurchase } = require("../../entities");

module.exports = {
  makeFilterPackPurchases({ packPurchasesDb, throwError }) {
    return async function ({ ...filters }) {
      if (typeof filters !== "object") {
        throwError({
          title: "Invalid filters.",
          error: "filters-not-object",
          status: 400,
          detail: "The filters parameter must be an object",
        });
      }

      const fromDb = await packPurchasesDb.smartFilter(filters);

      let rtn = [];
      // do try catch statements in a loop to prevent it dying if there's one corrupt packPurchase
      (fromDb || []).forEach((packPurchaseInfo) => {
        try {
          const packPurchase = makePackPurchase(packPurchaseInfo);
          rtn.push(packPurchase.getAll());
        } catch (e) {
          console.log(e);
        }
      });
      return rtn;
    };
  },
};
