const { gamesDb } = require("../../dataAccess");

const { makeEditGame } = require("./editGame");
const { makeFilterGames } = require("./filterGames");
const { makeInitiateGame } = require("./initiateGame");
const { makeCreateGame } = require("./createGame");
const { makeRemoveGame } = require("./removeGame");
const { makeJoinGame } = require("./joinGame");
const { makeLeaveGame } = require("./leaveGame");
const { makeExecuteTakeout } = require("./executeTakeout");

const { createTakeouts, removeTakeouts, filterTakeouts, editTakeout } = require("../takeout");
const { filterTakeoutMethods } = require("../takeoutMethod");
const { filterPackPurchases } = require("../packPurchase");

const throwError = require("../../errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});

const createGame = makeCreateGame({ gamesDb });
const editGame = makeEditGame({ gamesDb, throwError });
const filterGames = makeFilterGames({ gamesDb, throwError });
const initiateGame = makeInitiateGame({
  gamesDb,
  throwError,
  filterTakeoutMethods,
  createTakeouts,
  filterPackPurchases,
});
const removeGame = makeRemoveGame({
  gamesDb,
  removeTakeouts,
  filterTakeouts,
  throwError,
});
const joinGame = makeJoinGame({ gamesDb, throwError });
const leaveGame = makeLeaveGame({ gamesDb, throwError });
const executeTakeout = makeExecuteTakeout({
  throwError,
  filterTakeouts,
  createTakeouts,
  editTakeout,
  editGame,
});

module.exports = {
  createGame,
  editGame,
  initiateGame,
  filterGames,
  removeGame,
  joinGame,
  leaveGame,
  executeTakeout
};

