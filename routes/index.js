const catchError = require('errorHandling').buildCatchError({ logErrors: process.env.LOG_ERRORS });
const parseQuery = (query) => {
    if (query) {
        let newQuery = {};
        Object.entries(query).forEach(([key, value]) => {
          newQuery[key] =
            value === "true"
              ? true
              : value === "false"
              ? false
              : Number(value) || value;
        });
        return newQuery;
    }
  };
const { buildMakeExpressCallback } = require("../expressCallback")
const makeExpressCallback = buildMakeExpressCallback({ catchError, parseQuery })
const express = require('express');
const api = express.Router();


const { 
    postGame,
    putGame,
    getGame,
    deleteGame,
    patchGamePlayers,
    putGameStart,
    getTakeout,
    putTakeoutStatus
} = require('../controllers');

api.use(express.json());

api.post( `${process.env.PATH_ROUTE}/game`, makeExpressCallback(postGame) );
api.put( `${process.env.PATH_ROUTE}/game/:_id`, makeExpressCallback(putGame) );
api.get( `${process.env.PATH_ROUTE}/game`, makeExpressCallback(getGame) );
api.get( `${process.env.PATH_ROUTE}/game/:_id`, makeExpressCallback(getGame) );
api.delete( `${process.env.PATH_ROUTE}/game/:_id`, makeExpressCallback(deleteGame) );
api.patch( `${process.env.PATH_ROUTE}/game/:_id/:leaveOrJoin`, makeExpressCallback(patchGamePlayers) );
api.put( `${process.env.PATH_ROUTE}/game/:_id/started`, makeExpressCallback(putGameStart) );

api.get( `${process.env.PATH_ROUTE}/takeout`, makeExpressCallback(getTakeout) );
api.get( `${process.env.PATH_ROUTE}/takeout/:_id`, makeExpressCallback(getTakeout) );
api.put( `${process.env.PATH_ROUTE}/takeout/:_id/executed`, makeExpressCallback(putTakeoutStatus) );
api.put( `${process.env.PATH_ROUTE}/takeout/executed`, makeExpressCallback(putTakeoutStatus) );

api.get( `${process.env.PATH_ROUTE}/ping`, (req, res) => res.send("You pinged the games microservice!") );

module.exports = api;
