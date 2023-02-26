const { hitMethodsDb, hitsDb, gamesDb } = require('../dataAccess');

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

const createHitMethod = makeCreateHitMethod({ hitMethodsDb });
const editHitMethod = makeEditHitMethod({ hitMethodsDb, throwError });
const filterHitMethods = makeFilterHitMethods({ hitMethodsDb, throwError });

const createHit = makeCreateHit({ hitsDb });
const editHit = makeEditHit({ hitsDb, throwError });
const filterHits = makeFilterHits({ hitsDb, throwError });

const createGame = makeCreateGame({ gamesDb });
const editGame = makeEditGame({ gamesDb, throwError });
const filterGames = makeFilterGames({ gamesDb, throwError });
const initiateGame = makeInitiateGame({ gamesDb, throwError, filterHitMethods, createHit, editGame, shuffleArray });

const executeHit = makeExecuteHit({ hitsDb, throwError, filterHits, createHit, editHit, editGame });

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
