
module.exports = {
  makeHitsDb ({ makeDb, buildGeneralDb }) {
    return buildGeneralDb({ makeDb, collectionName: 'hits' });
  }
};
