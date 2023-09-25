
const { makeTakeoutsDb } = require('./takeoutsDb');
const { makeGamesDb } = require('./gamesDb');
const { makeTakeoutMethodsDb } = require('./takeoutMethodsDb');
const { makeDb, buildGeneralDb } = require('database');

const takeoutsDb = makeTakeoutsDb({ makeDb, buildGeneralDb });
const gamesDb = makeGamesDb({ makeDb, buildGeneralDb });
const takeoutMethodsDb = makeTakeoutMethodsDb({ makeDb, buildGeneralDb });

const dbs = Object.freeze({
  takeoutsDb,
  gamesDb,
  takeoutMethodsDb
});

module.exports =  { ...dbs };
