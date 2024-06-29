const {
    filterGames,
    filterTakeouts,
    executeTakeout
} = require("../../services");

const { buildGetTakeout } = require("./getTakeout");
const { buildPutTakeoutExecuted } = require("./putTakeoutExecuted");

module.exports = ({ throwError }) => {
    const getTakeout = buildGetTakeout({
        filterTakeouts,
        throwError,
        filterGames
    });
    const putTakeoutExecuted = buildPutTakeoutExecuted({
        executeTakeout,
        throwError,
        filterTakeouts
    });

    return {
        getTakeout,
        putTakeoutExecuted
    };
};
