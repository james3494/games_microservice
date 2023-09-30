const { takeoutsDb } = require("../../dataAccess");

const { makeCreateTakeout } = require("./createTakeout");
const { makeExecuteTakeout } = require("./executeTakeout");
const { makeEditTakeout } = require("./editTakeout");
const { makeFilterTakeouts } = require("./filterTakeouts");
const { makeRemoveTakeouts } = require("./removeTakeouts");
const { editGame } = require("../game");

const throwError = require("errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});

const createTakeout = makeCreateTakeout({ takeoutsDb });
const editTakeout = makeEditTakeout({ takeoutsDb, throwError });
const filterTakeouts = makeFilterTakeouts({ takeoutsDb, throwError });
const removeTakeouts = makeRemoveTakeouts({ takeoutsDb, throwError });
const executeTakeout = makeExecuteTakeout({
  takeoutsDb,
  throwError,
  filterTakeouts,
  createTakeout,
  editTakeout,
  editGame,
});

module.exports = {
  createTakeout,
  editTakeout,
  filterTakeouts,
  executeTakeout,
  removeTakeouts,
};
