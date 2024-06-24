const catchError = require("../errorHandling").buildCatchError({
  logErrors: process.env.LOG_ERRORS,
});
const { buildMakeExpressCallback } = require("../expressCallback");
const makeExpressCallback = buildMakeExpressCallback({ catchError });

const { buildTakeoutRoutes } = require("./takeout");
const { buildGameRoutes } = require("./game");
const { buildTakeoutMethodRoutes } = require("./takeoutMethod");
const { buildPackRoutes } = require("./pack");
const { buildRatingRoutes } = require("./rating");
const { buildPackPurchaseRoutes } = require("./packPurchase");

const express = require("express");
const api = express.Router();

api.use(express.json({limit: '20mb'}));

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
