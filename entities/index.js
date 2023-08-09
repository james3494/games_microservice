

const { Id } = require('./Id');
const { buildMakeTakeoutMethod } = require('./takeoutMethod');
const { buildMakeTakeout } = require('./takeout');
const { buildMakeGame } = require('./game');
const throwError = require('errorHandling').buildThrowError({ logErrors: process.env.LOG_ERRORS });

const allowedThemes = ['alcoholFree', 'home', 'out'];

const makeTakeoutMethod = buildMakeTakeoutMethod({ Id, throwError, allowedThemes });
const makeTakeout = buildMakeTakeout({ Id, throwError });
const makeGame = buildMakeGame({ Id, throwError, allowedThemes });




module.exports = {
  makeTakeoutMethod,
  makeTakeout,
  makeGame
};
