
const { createTakeoutMethod, editTakeoutMethod } = require('../services');
const { buildPostTakeoutMethod } = require('./postTakeoutMethod');
const throwError = require('errorHandling').buildThrowError({ logErrors: process.env.LOG_ERRORS });

const getLoggedIn = (httpRequest) => {
  try {
    return JSON.parse(httpRequest.headers["X-Current-User"])
  } catch (err) {
    throwError({
      title: "invalid user header passed",
      status: 500,
      error: "auth-invalid-user-header",
      detail: "A stringified object should be passed by the gateway to the microservice in a X-Current-User header"
    })
  }
}

const postTakeoutMethod = buildPostTakeoutMethod({ createTakeoutMethod, throwError, getLoggedIn });

const takeoutMethodController = Object.freeze({
  postTakeoutMethod
});

module.exports = { ...takeoutMethodController };
