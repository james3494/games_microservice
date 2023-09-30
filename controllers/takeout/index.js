const {
  filterGames,
  filterTakeouts,
  executeTakeout,
} = require("../../services");

const { buildGetTakeout } = require("./getTakeout");
const { buildPutTakeoutExecuted } = require("./putTakeoutExecuted");

module.exports = ({ throwError, getLoggedIn }) => {
  const getTakeout = buildGetTakeout({
    filterTakeouts,
    throwError,
    getLoggedIn,
    filterGames,
  });
  const putTakeoutExecuted = buildPutTakeoutExecuted({
    executeTakeout,
    throwError,
    getLoggedIn,
    filterTakeouts,
  });

  return {
    getTakeout,
    putTakeoutExecuted,
  };
};
