const { Id } = require("./Id");
const { buildMakeTakeout } = require("./takeout");
const { buildMakeGame } = require("./game");
const {
  buildTakeoutValidation,
  buildGameValidation,
} = require("validation");

const throwError = require("errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
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
  makeTakeout,
  makeGame,
};
