const { buildMakeExpressCallback } = require('../expressCallback/index');

const makeExpressCallback = buildMakeExpressCallback({
  getCookies: (req) => req.cookies // the cookie parser is being used so we can easily get cookies
})

const express = require('express');
const api = express.Router();
const { postTakeoutMethod, postGame } = require('../controllers');

api.use(express.json());
// todo change to unplurified words

api.post( `${process.env.PATH_ROUTE}/takeoutMethods`, makeExpressCallback(postTakeoutMethod) );
api.post( `${process.env.PATH_ROUTE}/game`, makeExpressCallback(postGame) );

// put takeoutMethods/:id - edit a takeout method
// get takeoutMethods - filters takeout methods
// get takeoutMethods/:id - gets specific takeoutMethod
// delete takeoutMethods/:id - disables a takeout method
// put game/:id - edits a game
// get game - filters games
// get game/:id - gets specific game
// put game/:id/invitees - edits the invitees
// put game/:id/players - edits the players
// put game/:id/admins - edits the admins
// initiate a game - sometimes this will be an automatic thing at the start time, othertimes someone will click start
// get game/:id/takeouts - filters takeouts
// get game/:id/takeouts/:id - gets specific takeout
// execute a takeout - someones successfully completed a takeout. this could either come from the target or chaser
// finish game - this will either be called by someone or called from executing a takeout if it's the last one

module.exports = api;
