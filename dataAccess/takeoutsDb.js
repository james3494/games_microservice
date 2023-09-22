
module.exports = {
  makeTakeoutsDb ({ makeDb, buildGeneralDb }) {
    return buildGeneralDb({ makeDb, collectionName: 'takeouts' });
  }
};
