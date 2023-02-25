
module.exports = {
  makeHitMethodsDb ({ makeDb, buildGeneralDb }) {
    return buildGeneralDb({ makeDb, collectionName: 'hitMethods' });
  }
};
