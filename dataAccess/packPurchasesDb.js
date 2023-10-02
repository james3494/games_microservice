module.exports = {
    makePackPurchasesDb({ makeDb, buildGeneralDb }) {
      return buildGeneralDb({ makeDb, collectionName: "packPurchases" });
    },
  };
  