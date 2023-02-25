

const { Id } = require('./Id');
const { buildMakeHitMethod } = require('./hitMethod');
const { buildMakeHit } = require('./hit');
const { buildMakeGame } = require('./game');
const { throwError } = require('errorHandling');

const makeHitMethod = buildMakeHitMethod({ Id, throwError });
const makeHit = buildMakeHit({ Id, throwError });
const makeGame = buildMakeGame({ Id, throwError });




module.exports = {
  makeHitMethod,
  makeHit,
  makeGame
};
