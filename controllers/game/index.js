const {
    createGame,
    editGame,
    filterGames,
    removeGame,
    initiateGame,
    joinGame,
    leaveGame
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
        throwError
    });

    const putGame = buildPutGame({
        editGame,
        throwError,
        filterGames
    });

    const getGame = buildGetGame({
        filterGames,
        throwError
    });
    const deleteGame = buildDeleteGame({
        removeGame,
        filterGames,
        throwError
    });
    const patchGamePlayers = buildPatchGamePlayers({
        joinGame,
        leaveGame,
        throwError
    });
    const putGameStart = buildPutGameStart({
        initiateGame,
        throwError,
        filterGames
    });

    return {
        postGame,
        putGame,
        getGame,
        deleteGame,
        putGameStart,
        patchGamePlayers
    };
};
