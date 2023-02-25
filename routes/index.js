const { buildMakeExpressCallback } = require('../expressCallback/index');

const makeExpressCallback = buildMakeExpressCallback({
  getCookies: (req) => req.cookies // the body parser is being used so we can easily get cookies
})

const express = require('express');
const api = express.Router();
const { postHitMethod } = require('../controllers');

api.use(express.json());

api.post( `${process.env.PATH_ROUTE}/hitMethods`, makeExpressCallback(postHitMethod) );
// api.put( `${process.env.PATH_ROUTE}/hitMethods/:_id`, makeExpressCallback(refreshToken) );
// api.get( `${process.env.PATH_ROUTE}/hitMethods/:_id`, makeExpressCallback(refreshToken) );
// api.delete( `${process.env.PATH_ROUTE}/hitMethods/:_id`, makeExpressCallback(refreshToken) );

module.exports = api;
