module.exports = {
  makePacksDb({ makeDb, buildGeneralDb }) {
    return buildGeneralDb({ makeDb, collectionName: "packs" });
  },
};
