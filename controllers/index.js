
const { createTakeoutMethod, editTakeoutMethod } = require('../services');
const { buildPostTakeoutMethod } = require('./postTakeoutMethod');
const { catchError, throwError } = require('errorHandling');

const getLoggedIn = (httpRequest) => {
  const token = httpRequest.headers.Authorization.split(' ')[1];
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const postTakeoutMethod = buildPostTakeoutMethod({ createTakeoutMethod, catchError, throwError, getLoggedIn });

const takeoutMethodController = Object.freeze({
  postTakeoutMethod
});

module.exports = { ...takeoutMethodController };
