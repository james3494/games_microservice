
const { makeHitMethodsDb } = require('./hitMethodsDb');
const { makeHitsDb } = require('./hitsDb');
const { makeGamesDb } = require('./gamesDb');
const { makeDb, buildGeneralDb } = require('database');

const hitMethodsDb = makeHitMethodsDb({ makeDb, buildGeneralDb });
const hitsDb = makeHitsDb({ makeDb, buildGeneralDb });
const gamesDb = makeGamesDb({ makeDb, buildGeneralDb });

const dbs = Object.freeze({
  hitMethodsDb,
  hitsDb,
  gamesDb
});

module.exports =  { ...dbs };
