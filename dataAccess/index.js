
const { makeTakeOutMethodsDb } = require('./takeOutMethodsDb');
const { makeTakeOutsDb } = require('./takeOutsDb');
const { makeGamesDb } = require('./gamesDb');
const { makeDb, buildGeneralDb } = require('database');

const takeOutMethodsDb = makeTakeOutMethodsDb({ makeDb, buildGeneralDb });
const takeOutsDb = makeTakeOutsDb({ makeDb, buildGeneralDb });
const gamesDb = makeGamesDb({ makeDb, buildGeneralDb });

const dbs = Object.freeze({
  takeOutMethodsDb,
  takeOutsDb,
  gamesDb
});

module.exports =  { ...dbs };
