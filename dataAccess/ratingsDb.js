module.exports = {
  makeRatingsDb({ makeDb, buildGeneralDb }) {
    return buildGeneralDb({ makeDb, collectionName: "ratings" });
  },
};
