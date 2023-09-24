
const { makeTakeoutsDb } = require('./takeoutsDb');
const { makeGamesDb } = require('./gamesDb');
const { makeDb, buildGeneralDb } = require('database');

const takeoutsDb = makeTakeoutsDb({ makeDb, buildGeneralDb });
const gamesDb = makeGamesDb({ makeDb, buildGeneralDb });

const dbs = Object.freeze({
  takeoutsDb,
  gamesDb
});

module.exports =  { ...dbs };
