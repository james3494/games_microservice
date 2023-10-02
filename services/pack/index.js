const { packsDb } = require("../../dataAccess");

const { makeCreatePack } = require("./createPack");
const { makeEditPack } = require("./editPack");
const { makeFilterPacks } = require("./filterPacks");

const throwError = require("errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});

const createPack = makeCreatePack({ packsDb });
const editPack = makeEditPack({
  packsDb,
  throwError,
});
const filterPacks = makeFilterPacks({
  packsDb,
  throwError,
});

module.exports = {
  createPack,
  editPack,
  filterPacks,
};
