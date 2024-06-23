const { packPurchasesDb } = require("../../dataAccess");

const { makeCreatePackPurchase } = require("./createPackPurchase");
const { makeFilterPackPurchases } = require("./filterPackPurchases");

const throwError = require("../../errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});

const createPackPurchase = makeCreatePackPurchase({ packPurchasesDb });
const filterPackPurchases = makeFilterPackPurchases({
  packPurchasesDb,
  throwError,
});

module.exports = {
  createPackPurchase,
  filterPackPurchases,
};
