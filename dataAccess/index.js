
const { makeTakeoutsDb } = require('./takeoutsDb');
const { makePacksDb } = require('./packsDb');
const { makePackPurchasesDb } = require('./packPurchasesDb');
const { makeRatingsDb } = require('./ratingsDb');
const { makeGamesDb } = require('./gamesDb');
const { makeTakeoutMethodsDb } = require('./takeoutMethodsDb');
const { makeDb, buildGeneralDb } = require('database');

const takeoutsDb = makeTakeoutsDb({ makeDb, buildGeneralDb });
const gamesDb = makeGamesDb({ makeDb, buildGeneralDb });
const takeoutMethodsDb = makeTakeoutMethodsDb({ makeDb, buildGeneralDb });
const packsDb = makePacksDb({ makeDb, buildGeneralDb });
const packPurchasesDb = makePackPurchasesDb({ makeDb, buildGeneralDb });
const ratingsDb = makeRatingsDb({ makeDb, buildGeneralDb });

const dbs = Object.freeze({
  takeoutsDb,
  gamesDb,
  takeoutMethodsDb,
  ratingsDb,
  packsDb,
  packPurchasesDb
});

module.exports =  { ...dbs };
