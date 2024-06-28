const {
  createGame,
  editGame,
  filterGames,
  removeGame,
  initiateGame,
  joinGame,
  leaveGame,
} = require("../../services");
const { buildPostGame } = require("./postGame");
const { buildPutGame } = require("./putGame");
const { buildGetGame } = require("./getGame");
const { buildDeleteGame } = require("./deleteGame");
const { buildPatchGamePlayers } = require("./patchGamePlayers");
const { buildPutGameStart } = require("./putGameStart");

module.exports = ({ throwError }) => {
  const postGame = buildPostGame({
    createGame,
    throwError,
    getLoggedIn,
  });

  const putGame = buildPutGame({
    editGame,
    throwError,
    getLoggedIn,
    filterGames,
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
    filterGames,
  });

  return {
    postGame,
    putGame,
    getGame,
    deleteGame,
    putGameStart,
    patchGamePlayers,
  };
};
