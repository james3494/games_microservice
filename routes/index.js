const catchError = require('errorHandling').buildCatchError({ logErrors: process.env.LOG_ERRORS });
const { buildMakeExpressCallback } = require("../expressCallback")
const makeExpressCallback = buildMakeExpressCallback({ catchError })
const express = require('express');
const api = express.Router();


const { 
    postTakeoutMethod, 
    postGame,
    putTakeoutMethodDisabled,
    getTakeoutMethod,
    deleteTakeoutMethod,
    putGame,
    getGame,
    deleteGame,
    patchGameInvited,
    patchGamePlayers,
    putGameStart,
    getTakeout,
    putTakeoutStatus
} = require('../controllers');

api.use(express.json());

api.post( `${process.env.PATH_ROUTE}/takeoutMethod`, makeExpressCallback(postTakeoutMethod) );
api.put( `${process.env.PATH_ROUTE}/takeoutMethod/:_id/disabled`, makeExpressCallback(putTakeoutMethodDisabled) );
api.get( `${process.env.PATH_ROUTE}/takeoutMethod`, makeExpressCallback(getTakeoutMethod) );
api.get( `${process.env.PATH_ROUTE}/takeoutMethod/:_id`, makeExpressCallback(getTakeoutMethod) );
api.delete( `${process.env.PATH_ROUTE}/takeoutMethod/:_id`, makeExpressCallback(deleteTakeoutMethod) );

api.post( `${process.env.PATH_ROUTE}/game`, makeExpressCallback(postGame) );
api.put( `${process.env.PATH_ROUTE}/game/:_id`, makeExpressCallback(putGame) );
api.get( `${process.env.PATH_ROUTE}/game`, makeExpressCallback(getGame) );
api.get( `${process.env.PATH_ROUTE}/game/:_id`, makeExpressCallback(getGame) );
api.delete( `${process.env.PATH_ROUTE}/game/:_id`, makeExpressCallback(deleteGame) );
api.patch( `${process.env.PATH_ROUTE}/game/:_id/invited/:user_id`, makeExpressCallback(patchGameInvited) );
api.patch( `${process.env.PATH_ROUTE}/game/:_id/:leaveOrJoin/:joinLink`, makeExpressCallback(patchGamePlayers) );
api.patch( `${process.env.PATH_ROUTE}/game/:_id/:leaveOrJoin`, makeExpressCallback(patchGamePlayers) );
api.put( `${process.env.PATH_ROUTE}/game/:_id/started`, makeExpressCallback(putGameStart) );

api.get( `${process.env.PATH_ROUTE}/takeout`, makeExpressCallback(getTakeout) );
api.get( `${process.env.PATH_ROUTE}/takeout/:_id`, makeExpressCallback(getTakeout) );
api.put( `${process.env.PATH_ROUTE}/takeout/:_id/executed`, makeExpressCallback(putTakeoutStatus) );
api.put( `${process.env.PATH_ROUTE}/takeout/executed`, makeExpressCallback(putTakeoutStatus) );

api.get( `${process.env.PATH_ROUTE}/ping`, (req, res) => res.send("You pinged the takeout microservice!") );

module.exports = api;
