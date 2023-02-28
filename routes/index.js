const { buildMakeExpressCallback } = require('../expressCallback/index');

const makeExpressCallback = buildMakeExpressCallback({
  getCookies: (req) => req.cookies // the cookie parser is being used so we can easily get cookies
})

const express = require('express');
const api = express.Router();
const { postHitMethod } = require('../controllers');

api.use(express.json());
// todo change to unplurified words

api.post( `${process.env.PATH_ROUTE}/hitMethods`, makeExpressCallback(postHitMethod) );
// put hitMethods/:id - edit a hit method
// get hitMethods - filters hit methods
// get hitMethods/:id - gets specific hitMethod
// get hitMethods/:id/:field - gets specific hitMethod field
// delete hitMethods/:id - disables a hit method
// post game - creates a game
// put game/:id - edits a game
// get game - filters games
// get game/:id - gets specific game
// get game/:id/:field - gets specific game field
// put game/:id/invitees - edits the invitees
// put game/:id/players - edits the players
// put game/:id/admins - edits the admins
// initiate a game - sometimes this will be an automatic thing at the start time, othertimes someone will click start
// get game/:id/hits - filters hits
// get game/:id/hits/:id - gets specific hit
// execute a hit - someones successfully completed a hit. this could either come from the target or chaser
// finish game - this will either be called by someone or called from executing a hit if it's the last one

module.exports = api;
