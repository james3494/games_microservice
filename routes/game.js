const {
    postGame,
    putGame,
    getGame,
    deleteGame,
    patchGamePlayers,
    putGameStart
} = require("../controllers");

module.exports = {
    buildGameRoutes: ({ makeExpressCallback, api }) => {
        api.post(`${process.env.PATH_ROUTE}/game`, makeExpressCallback(postGame));
        api.put(
            `${process.env.PATH_ROUTE}/game/:_id`,
            makeExpressCallback(putGame)
        );
        api.get(`${process.env.PATH_ROUTE}/game`, makeExpressCallback(getGame));
        api.get(
            `${process.env.PATH_ROUTE}/game/:_id`,
            makeExpressCallback(getGame)
        );
        api.delete(
            `${process.env.PATH_ROUTE}/game/:_id`,
            makeExpressCallback(deleteGame)
        );
        api.patch(
            `${process.env.PATH_ROUTE}/game/:_id/:leaveOrJoin`,
            makeExpressCallback(patchGamePlayers)
        );
        api.put(
            `${process.env.PATH_ROUTE}/game/:_id/started`,
            makeExpressCallback(putGameStart)
        );
    }
};
