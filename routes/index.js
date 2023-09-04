const catchError = require('errorHandling').buildCatchError({ logErrors: process.env.LOG_ERRORS });
const { buildMakeExpressCallback } = require("../expressCallback")
const makeExpressCallback = buildMakeExpressCallback({ catchError })
const express = require('express');
const api = express.Router();


const { 
    postTakeoutMethod, 
    postGame,
    putTakeoutMethod,
    getTakeoutMethod,
    deleteTakeoutMethod,
    putGame,
    getGame,
    deleteGame,
    patchGameInvited
} = require('../controllers');

api.use(express.json());

api.post( `${process.env.PATH_ROUTE}/takeoutMethod`, makeExpressCallback(postTakeoutMethod) );
api.put( `${process.env.PATH_ROUTE}/takeoutMethod/:_id`, makeExpressCallback(putTakeoutMethod) );
api.get( `${process.env.PATH_ROUTE}/takeoutMethod`, makeExpressCallback(getTakeoutMethod) );
api.get( `${process.env.PATH_ROUTE}/takeoutMethod/:_id`, makeExpressCallback(getTakeoutMethod) );
api.delete( `${process.env.PATH_ROUTE}/takeoutMethod/:_id`, makeExpressCallback(deleteTakeoutMethod) );

api.post( `${process.env.PATH_ROUTE}/game`, makeExpressCallback(postGame) );
api.put( `${process.env.PATH_ROUTE}/game/:_id`, makeExpressCallback(putGame) );
api.get( `${process.env.PATH_ROUTE}/game`, makeExpressCallback(getGame) );
api.get( `${process.env.PATH_ROUTE}/game/:_id`, makeExpressCallback(getGame) );
api.delete( `${process.env.PATH_ROUTE}/game/:_id`, makeExpressCallback(deleteGame) );
api.patch( `${process.env.PATH_ROUTE}/game/:_id/invited/:user_id`, makeExpressCallback(patchGameInvited) );

// put game/:id/status initiate a game - sometimes this will be an automatic thing at the start time, othertimes someone will click start
// get game/:id/takeouts - filters takeouts. Takeouts should only be got through a game
// get game/:id/takeouts/:id - gets specific takeout
// put game/:id/takeouts/:id/status execute a takeout - someones successfully completed a takeout. this could either come from the target or chaser
// put game/:id/status finish game - this will either be called by someone or called from executing a takeout if it's the last one
api.get( `${process.env.PATH_ROUTE}/ping`, (req, res) => res.send("You pinged the takeout microservice!") );

module.exports = api;
