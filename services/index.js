const { takeOutMethodsDb, takeOutsDb, gamesDb } = require('../dataAccess');

const { makeCreateHitMethod } = require('./createHitMethod');
const { makeEditHitMethod } = require('./editHitMethod');
const { makeFilterHitMethods } = require('./filterHitMethods');
const { makeEditGame } = require('./editGame');
const { makeFilterGames } = require('./filterGames');
const { makeInitiateGame } = require('./initiateGame');
const { makeCreateGame } = require('./createGame');
const { makeCreateHit } = require('./createHit');
const { makeExecuteHit } = require('./executeHit');
const { makeEditHit } = require('./editHit');
const { makeFilterHits } = require('./filterHits');

const { throwError } = require('errorHandling');

const createHitMethod = makeCreateHitMethod({ takeOutMethodsDb });
const editHitMethod = makeEditHitMethod({ takeOutMethodsDb, throwError });
const filterHitMethods = makeFilterHitMethods({ takeOutMethodsDb, throwError });

const createHit = makeCreateHit({ takeOutsDb });
const editHit = makeEditHit({ takeOutsDb, throwError });
const filterHits = makeFilterHits({ takeOutsDb, throwError });

const createGame = makeCreateGame({ gamesDb });
const editGame = makeEditGame({ gamesDb, throwError });
const filterGames = makeFilterGames({ gamesDb, throwError });
const initiateGame = makeInitiateGame({ gamesDb, throwError, filterHitMethods, createHit, editGame, shuffleArray });

const executeHit = makeExecuteHit({ takeOutsDb, throwError, filterHits, createHit, editHit, editGame });

const hitMethodService = Object.freeze({
  createHitMethod,
  editHitMethod,
  filterHitMethods,
  createHit,
  editHit,
  filterHits,
  createGame,
  editGame,
  initiateGame,
  executeHit,
});


module.exports = { ...hitMethodService };



function shuffleArray(array) {
  let b = [...array];
  for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
