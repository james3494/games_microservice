const {
  createTakeoutMethod,
  editTakeoutMethod,
  createGame,
  editGame,
  filterGames,
  filterTakeoutMethods,
  filterTakeouts,
  removeTakeoutMethod,
  removeGame,
  initiateGame,
  acceptGameInvitation,
  declineGameInvitation,
  executeTakeout,
} = require("../services");
const { buildPostTakeoutMethod } = require("./postTakeoutMethod");
const { buildPutTakeoutMethod } = require("./putTakeoutMethod");
const { buildGetTakeoutMethod } = require("./getTakeoutMethod");
const { buildDeleteTakeoutMethod } = require("./deleteTakeoutMethod");
const { buildPostGame } = require("./postGame");
const { buildPutGame } = require("./putGame");
const { buildGetGame } = require("./getGame");
const { buildDeleteGame } = require("./deleteGame");
const { buildPatchGameInvited } = require("./patchGameInvited");
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

const postTakeoutMethod = buildPostTakeoutMethod({
  createTakeoutMethod,
  throwError,
  getLoggedIn,
});

const putTakeoutMethod = buildPutTakeoutMethod({
  editTakeoutMethod,
  throwError,
  getLoggedIn,
});

const getTakeoutMethod = buildGetTakeoutMethod({
  filterTakeoutMethods,
  throwError,
  getLoggedIn
});

const deleteTakeoutMethod = buildDeleteTakeoutMethod({
  removeTakeoutMethod,
  throwError,
  getLoggedIn,
});

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
  throwError,
  getLoggedIn,
});
const patchGameInvited = buildPatchGameInvited({
  acceptGameInvitation,
  declineGameInvitation,
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

const takeoutMethodController = Object.freeze({
  postTakeoutMethod,
  putTakeoutMethod,
  getTakeoutMethod,
  deleteTakeoutMethod,
  postGame,
  putGame,
  getGame,
  deleteGame,
  patchGameInvited,
  putGameStart,
  getTakeout,
  putTakeoutStatus,
});

module.exports = { ...takeoutMethodController };
