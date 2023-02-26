
module.exports = {
  makeGamesDb ({ makeDb, buildGeneralDb }) {
    return buildGeneralDb({ makeDb, collectionName: 'games' });
  }
};
