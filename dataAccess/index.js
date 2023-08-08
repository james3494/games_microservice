
const { makeTakeoutMethodsDb } = require('./takeoutMethodsDb');
const { makeTakeoutsDb } = require('./takeoutsDb');
const { makeGamesDb } = require('./gamesDb');
const { makeDb, buildGeneralDb } = require('database');

const takeoutMethodsDb = makeTakeoutMethodsDb({ makeDb, buildGeneralDb });
const takeoutsDb = makeTakeoutsDb({ makeDb, buildGeneralDb });
const gamesDb = makeGamesDb({ makeDb, buildGeneralDb });

const dbs = Object.freeze({
  takeoutMethodsDb,
  takeoutsDb,
  gamesDb
});

module.exports =  { ...dbs };
