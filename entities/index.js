

const { Id } = require('./Id');
const { buildMakeHitMethod } = require('./hitMethod');
const { buildMakeHit } = require('./hit');
const { buildMakeGame } = require('./game');
const { throwError } = require('errorHandling');

const allowedThemes = ['alcoholFree', 'home', 'out'];

const makeHitMethod = buildMakeHitMethod({ Id, throwError, allowedThemes });
const makeHit = buildMakeHit({ Id, throwError });
const makeGame = buildMakeGame({ Id, throwError, allowedThemes });




module.exports = {
  makeHitMethod,
  makeHit,
  makeGame
};
