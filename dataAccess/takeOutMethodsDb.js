
module.exports = {
  makeTakeOutMethodsDb ({ makeDb, buildGeneralDb }) {
    return buildGeneralDb({ makeDb, collectionName: 'hitMethods' });
  }
};
