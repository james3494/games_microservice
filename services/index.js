const { takeoutMethodsDb, takeoutsDb, gamesDb } = require('../dataAccess');

const { makeCreateTakeoutMethod } = require('./createTakeoutMethod');
const { makeEditTakeoutMethod } = require('./editTakeoutMethod');
const { makeFilterTakeoutMethods } = require('./filterTakeoutMethods');
const { makeEditGame } = require('./editGame');
const { makeFilterGames } = require('./filterGames');
const { makeInitiateGame } = require('./initiateGame');
const { makeCreateGame } = require('./createGame');
const { makeCreateTakeout } = require('./createTakeout');
const { makeExecuteTakeout } = require('./executeTakeout');
const { makeEditTakeout } = require('./editTakeout');
const { makeFilterTakeouts } = require('./filterTakeouts');

const throwError = require('errorHandling').buildThrowError({ logErrors: process.env.LOG_ERRORS });

const createTakeoutMethod = makeCreateTakeoutMethod({ takeoutMethodsDb });
const editTakeoutMethod = makeEditTakeoutMethod({ takeoutMethodsDb, throwError });
const filterTakeoutMethods = makeFilterTakeoutMethods({ takeoutMethodsDb, throwError });

const createTakeout = makeCreateTakeout({ takeoutsDb });
const editTakeout = makeEditTakeout({ takeoutsDb, throwError });
const filterTakeouts = makeFilterTakeouts({ takeoutsDb, throwError });

const createGame = makeCreateGame({ gamesDb });
const editGame = makeEditGame({ gamesDb, throwError });
const filterGames = makeFilterGames({ gamesDb, throwError });
const initiateGame = makeInitiateGame({ gamesDb, throwError, filterTakeoutMethods, createTakeout, editGame, shuffleArray });

const executeTakeout = makeExecuteTakeout({ takeoutsDb, throwError, filterTakeouts, createTakeout, editTakeout, editGame });

const takeoutMethodService = Object.freeze({
  createTakeoutMethod,
  editTakeoutMethod,
  filterTakeoutMethods,
  createTakeout,
  editTakeout,
  filterTakeouts,
  createGame,
  editGame,
  initiateGame,
  executeTakeout,
  filterGames
});


module.exports = { ...takeoutMethodService };



function shuffleArray(array) {
  let b = [...array];
  for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
