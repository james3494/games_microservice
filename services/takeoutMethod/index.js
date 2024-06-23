const { takeoutMethodsDb } = require("../../dataAccess");

const { makeCreateTakeoutMethod } = require("./createTakeoutMethod");
const { makeCreateManyTakeoutMethods } = require("./createManyTakeoutMethods");
const { makeEditTakeoutMethod } = require("./editTakeoutMethod");
const { makeFilterTakeoutMethods } = require("./filterTakeoutMethods");
const { makeRemoveTakeoutMethod } = require("./removeTakeoutMethod");

const throwError = require("../../errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});

const createTakeoutMethod = makeCreateTakeoutMethod({ takeoutMethodsDb });
const createManyTakeoutMethods = makeCreateManyTakeoutMethods({ takeoutMethodsDb });
const editTakeoutMethod = makeEditTakeoutMethod({
  takeoutMethodsDb,
  throwError,
});
const filterTakeoutMethods = makeFilterTakeoutMethods({
  takeoutMethodsDb,
  throwError,
});
const removeTakeoutMethod = makeRemoveTakeoutMethod({
  takeoutMethodsDb,
  throwError,
});

module.exports = {
  createTakeoutMethod,
  createManyTakeoutMethods,
  editTakeoutMethod,
  filterTakeoutMethods,
  removeTakeoutMethod,
};
