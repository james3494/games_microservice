
const { addHitMethod, editHitMethod, removeHitMethod } = require('../services');
const { buildPostHitMethod } = require('./postHitMethod');
const { catchError } = require('errorHandling');

const postHitMethod = buildPostHitMethod({ addHitMethod, catchError });

const hitMethodController = Object.freeze({
  postHitMethod
});

module.exports = { ...hitMethodController };
