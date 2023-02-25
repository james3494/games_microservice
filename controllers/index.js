
const { addHitMethod, editHitMethod, removeHitMethod } = require('../services');
const { buildPostHitMethod } = require('./postHitMethod');
const { catchError, throwError } = require('errorHandling');

const getLoggedIn = (httpRequest) => {
  const token = httpRequest.headers.Authorization.split(' ')[1];
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const postHitMethod = buildPostHitMethod({ addHitMethod, catchError, throwError, getLoggedIn });

const hitMethodController = Object.freeze({
  postHitMethod
});

module.exports = { ...hitMethodController };
