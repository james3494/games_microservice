const { Id } = require("./Id");
const { buildMakeTakeoutMethod } = require("./takeoutMethod");
const { buildMakeTakeout } = require("./takeout");
const { buildMakeGame } = require("./game");
const {
  buildTakeoutMethodValidation,
  buildTakeoutValidation,
  buildGameValidation,
} = require("./validation");

const throwError = require("errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});

const allowedThemes = ["alcoholFree", "home", "out"];

const makeTakeoutMethod = buildMakeTakeoutMethod({
  Id,
  throwError,
  validation: buildTakeoutMethodValidation({ Id }),
});

const makeTakeout = buildMakeTakeout({
  Id,
  throwError,
  validation: buildTakeoutValidation({ Id }),
});

const makeGame = buildMakeGame({
  Id,
  throwError,
  validation: buildGameValidation({ Id }),
});

module.exports = {
  makeTakeoutMethod,
  makeTakeout,
  makeGame,
};
