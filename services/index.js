const { takeoutMethodsDb, takeoutsDb, gamesDb } = require('../dataAccess');

const { makeCreateTakeoutMethod } = require('./createTakeoutMethod');
const { makeEditTakeoutMethod } = require('./editTakeoutMethod');
const { makeFilterTakeoutMethods } = require('./filterTakeoutMethods');
const { makeRemoveTakeoutMethod } = require('./removeTakeoutMethod');
const { makeEditGame } = require('./editGame');
const { makeFilterGames } = require('./filterGames');
const { makeInitiateGame } = require('./initiateGame');
const { makeCreateGame } = require('./createGame');
const { makeRemoveGame } = require('./removeGame');
const { makeAcceptGameInvitation } = require('./acceptGameInvitation');
const { makeDeclineGameInvitation } = require('./declineGameInvitation');
const { makeJoinGame } = require('./joinGame');
const { makeCreateTakeout } = require('./createTakeout');
const { makeExecuteTakeout } = require('./executeTakeout');
const { makeEditTakeout } = require('./editTakeout');
const { makeFilterTakeouts } = require('./filterTakeouts');
const { makeRemoveTakeouts } = require('./removeTakeouts');

const throwError = require('errorHandling').buildThrowError({ logErrors: process.env.LOG_ERRORS });

const createTakeoutMethod = makeCreateTakeoutMethod({ takeoutMethodsDb });
const editTakeoutMethod = makeEditTakeoutMethod({ takeoutMethodsDb, throwError });
const filterTakeoutMethods = makeFilterTakeoutMethods({ takeoutMethodsDb, throwError });
const removeTakeoutMethod = makeRemoveTakeoutMethod({ takeoutMethodsDb, throwError });

const createTakeout = makeCreateTakeout({ takeoutsDb });
const editTakeout = makeEditTakeout({ takeoutsDb, throwError });
const filterTakeouts = makeFilterTakeouts({ takeoutsDb, throwError });
const removeTakeouts = makeRemoveTakeouts({ takeoutsDb, throwError });

const createGame = makeCreateGame({ gamesDb });
const editGame = makeEditGame({ gamesDb, throwError });
const filterGames = makeFilterGames({ gamesDb, throwError });
const initiateGame = makeInitiateGame({ gamesDb, throwError, filterTakeoutMethods, createTakeout, shuffleArray });
const removeGame = makeRemoveGame({ gamesDb, removeTakeouts, filterTakeouts, throwError });
const acceptGameInvitation = makeAcceptGameInvitation({ gamesDb, throwError });
const declineGameInvitation = makeDeclineGameInvitation({ gamesDb, throwError });
const joinGame = makeJoinGame({ gamesDb, throwError });

const executeTakeout = makeExecuteTakeout({ takeoutsDb, throwError, filterTakeouts, createTakeout, editTakeout, gamesDb });

const takeoutMethodService = Object.freeze({
  createTakeoutMethod,
  editTakeoutMethod,
  filterTakeoutMethods,
  removeTakeoutMethod,
  createTakeout,
  editTakeout,
  filterTakeouts,
  createGame,
  editGame,
  initiateGame,
  executeTakeout,
  filterGames,
  removeGame,
  acceptGameInvitation,
  declineGameInvitation,
  joinGame
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
