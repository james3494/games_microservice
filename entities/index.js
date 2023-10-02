const { Id } = require("./Id");
const { buildMakeTakeout } = require("./takeout");
const { buildMakeGame } = require("./game");
const { buildMakeTakeoutMethod } = require("./takeoutMethod");
const { buildMakeRating } = require("./rating");
const { buildMakePack } = require("./pack");
const { buildMakePackPurchase } = require("./packPurchase");
const {
  buildTakeoutValidation,
  buildGameValidation,
  buildTakeoutMethodValidation,
  buildRatingValidation,
  buildPackValidation,
  buildPackPurchaseValidation,
} = require("validation");

const throwError = require("errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});

const makeTakeout = buildMakeTakeout({
  Id,
  throwError,
  validate: buildValidate("takeout", buildTakeoutValidation({ Id })),
});

const makeGame = buildMakeGame({
  Id,
  throwError,
  validate: buildValidate("game", buildGameValidation({ Id })),
});
const makeTakeoutMethod = buildMakeTakeoutMethod({
  Id,
  validate: buildValidate("takeoutMethod", buildTakeoutMethodValidation({ Id })),
});

const makeRating = buildMakeRating({
  Id,
  validate: buildValidate("rating", buildRatingValidation({ Id })),
});

const makePack = buildMakePack({
  Id,
  validate: buildValidate("pack", buildPackValidation({ Id })),
});

const makePackPurchase = buildMakePackPurchase({
  Id,
  validate: buildValidate("packPurchase", buildPackPurchaseValidation({ Id })),
});


module.exports = {
  makeTakeout,
  makeGame,
  makeTakeoutMethod,
  makeRating,
  makePack,
  makePackPurchase,
};


function buildValidate(entityName, validation) {
  return (values) => {
    Object.entries(values).forEach(([key, value]) => {
      if (!validation[key])
        throwError({
          status: 500,
          title: "no validation found for " + key,
          error: "validation-missing-key",
        });
      const { passed, rule, reason } = validation[key](value);
      if (!passed)
        throwError({
          status: 400,
          error: entityName + "-invalid-" + key,
          title: rule,
          detail: reason,
        });
    });
  };
}

