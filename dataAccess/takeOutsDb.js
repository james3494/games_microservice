
module.exports = {
  makeTakeOutsDb ({ makeDb, buildGeneralDb }) {
    return buildGeneralDb({ makeDb, collectionName: 'hits' });
  }
};
