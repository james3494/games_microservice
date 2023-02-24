

const { Id } = require('./Id');
const { buildMakeHitMethod } = require('./hitMethod');
const { buildMakeHit } = require('./hit');
const { buildMakeGame } = require('./game');

const makeHitMethod = buildMakeHitMethod({ Id });
const makeHit = buildMakeHit({ Id });
const makeGame = buildMakeGame({ Id });




module.exports = {
  makeHitMethod,
  makeHit,
  makeGame
};
