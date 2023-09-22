
module.exports = {
  makeTakeoutMethodsDb ({ makeDb, buildGeneralDb }) {
    return buildGeneralDb({ makeDb, collectionName: 'takeoutMethods' });
  }
};
