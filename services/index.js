const { hitMethodDb } = require('../dataAccess');

const { makeAddHitMethod } = require('./addHitMethod');
const { makeRemoveHitMethod } = require('./removeHitMethod');
const { makeEditHitMethod } = require('./editHitMethod');


const addHitMethod = makeAddHitMethod({ hitMethodDb });
const removeHitMethod = makeRemoveHitMethod({ hitMethodDb });
const editHitMethod = makeEditHitMethod({ hitMethodDb });

const hitMethodService = Object.freeze({
  addHitMethod,
  removeHitMethod,
  editHitMethod
});

module.exports = { ...hitMethodService };
