const {
  createTakeoutMethod,
  editTakeoutMethod,
  createGame,
  editGame,
  filterGames,
  filterTakeoutMethods,
  filterTakeouts,
} = require("../services");
const { buildPostTakeoutMethod } = require("./postTakeoutMethod");
const { buildPutTakeoutMethod } = require("./putTakeoutMethod");
const { buildPostGame } = require("./postGame");
const { buildPutGame } = require("./putGame");
const throwError = require("errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});

const getLoggedIn = (httpRequest) => {
  try {
    return JSON.parse(httpRequest.headers["X-Current-User"]);
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

const postGame = buildPostGame({
  createGame,
  throwError,
  getLoggedIn,
});

const putGame = buildPutGame({
  editGame,
  throwError,
  getLoggedIn,
});

const getGame = buildGetGame({
  filterGames,
  throwError,
  getLoggedIn,
});

const takeoutMethodController = Object.freeze({
  postTakeoutMethod,
  putTakeoutMethod,
  postGame,
  putGame,
  getGame
});

module.exports = { ...takeoutMethodController };
