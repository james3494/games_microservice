
const { makeHitMethodsDb } = require('./hitMethodsDb');
const { makeDb, buildGeneralDb } = require('database');

const hitMethodsDb = makeHitMethodsDb({ makeDb, buildGeneralDb });

module.exports =  { hitMethodsDb };
