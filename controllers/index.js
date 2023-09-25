const {
  createGame,
  editGame,
  filterGames,
  filterTakeouts,
  removeGame,
  initiateGame,
  joinGame,
  leaveGame,
  executeTakeout,
} = require("../services");
const { buildPostGame } = require("./postGame");
const { buildPutGame } = require("./putGame");
const { buildGetGame } = require("./getGame");
const { buildDeleteGame } = require("./deleteGame");
const { buildPatchGamePlayers } = require("./patchGamePlayers");
const { buildPutGameStart } = require("./putGameStart");
const { buildGetTakeout } = require("./getTakeout");
const { buildPutTakeoutStatus } = require("./putTakeoutExecuted");
const throwError = require("errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});

const getLoggedIn = (httpRequest) => {
  try {
    let loggedIn = JSON.parse(httpRequest.headers["X-Current-User"]) || {};
    // if no _id the user is not logged in
    if (!loggedIn._id) return null;
    if (!loggedIn.admin) loggedIn.admin = {};
    return loggedIn;
  } catch (err) {
    throwError({
      title: "invalid user header passed",
      status: 500,
      error: "auth-invalid-user-header",
      detail:
        "A stringified object should be passed by the gateway to the microservice in a X-Current-User header",
    });
  }
};

const postGame = buildPostGame({
  createGame,
  throwError,
  getLoggedIn,
});

const putGame = buildPutGame({
  editGame,
  throwError,
  getLoggedIn,
  filterGames
});

const getGame = buildGetGame({
  filterGames,
  throwError,
  getLoggedIn,
});
const deleteGame = buildDeleteGame({
  removeGame,
  filterGames,
  throwError,
  getLoggedIn,
});
const patchGamePlayers = buildPatchGamePlayers({
  joinGame,
  leaveGame,
  throwError,
  getLoggedIn,
});
const putGameStart = buildPutGameStart({
  initiateGame,
  throwError,
  getLoggedIn,
  filterGames
});
const getTakeout = buildGetTakeout({
  filterTakeouts,
  throwError,
  getLoggedIn,
  filterGames
});
const putTakeoutStatus = buildPutTakeoutStatus({
  executeTakeout,
  throwError,
  getLoggedIn,
  filterTakeouts
});

const gamesController = Object.freeze({
  postGame,
  putGame,
  getGame,
  deleteGame,
  putGameStart,
  getTakeout,
  putTakeoutStatus,
  patchGamePlayers
});

module.exports = { ...gamesController };
