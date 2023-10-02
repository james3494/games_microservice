const { makePackPurchase } = require('../../entities');

module.exports = {
   makeCreatePackPurchase ({ packPurchasesDb }) {
    return async function ({ ...packPurchaseParams }) {
      const packPurchase = makePackPurchase({ ...packPurchaseParams });

      return await packPurchasesDb.insert({
        ... packPurchase.getAll()
      });
    };
  }
};
