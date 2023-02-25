const { hitMethodsDb } = require('../dataAccess');

const { makeAddHitMethod } = require('./addHitMethod');
const { makeEditHitMethod } = require('./editHitMethod');

const { throwError } = require('errorHandling');

const addHitMethod = makeAddHitMethod({ hitMethodsDb });
const editHitMethod = makeEditHitMethod({ hitMethodsDb });

const hitMethodService = Object.freeze({
  addHitMethod,
  editHitMethod
});

module.exports = { ...hitMethodService };
