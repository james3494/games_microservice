const catchError = require("errorHandling").buildCatchError({
  logErrors: process.env.LOG_ERRORS,
});
const parseQuery = (query) => {
  if (query) {
    let newQuery = {};
    Object.entries(query).forEach(([key, value]) => {
      try {
        newQuery[key] = JSON.parse(value);
      } catch {
        newQuery[key] = value;
      }
    });
    return newQuery;
  }
};
const { buildMakeExpressCallback } = require("../expressCallback");
const makeExpressCallback = buildMakeExpressCallback({
  catchError,
  parseQuery,
});
const { buildTakeoutRoutes } = require("./takeout");
const { buildGameRoutes } = require("./game");
const { buildTakeoutMethodRoutes } = require("./takeoutMethod");
const { buildPackRoutes } = require("./pack");
const { buildRatingRoutes } = require("./rating");
const { buildPackPurchaseRoutes } = require("./packPurchase");

const express = require("express");
const api = express.Router();

api.use(express.json());

buildTakeoutRoutes({ makeExpressCallback, api });
buildGameRoutes({ makeExpressCallback, api });
buildTakeoutMethodRoutes({ makeExpressCallback, api });
buildPackRoutes({ makeExpressCallback, api });
buildRatingRoutes({ makeExpressCallback, api });
buildPackPurchaseRoutes({ makeExpressCallback, api });

api.get(`${process.env.PATH_ROUTE}/ping`, (req, res) =>
  res.send("You pinged the games microservice!")
);

module.exports = api;
