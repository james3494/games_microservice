const { ratingsDb } = require("../../dataAccess");

const { makeCreateRating } = require("./createRating");
const { makeEditRating } = require("./editRating");
const { makeFilterRatings } = require("./filterRatings");

const throwError = require("../../errorHandling").buildThrowError({
    logErrors: process.env.LOG_ERRORS
});

const createRating = makeCreateRating({
    ratingsDb 
});
const editRating = makeEditRating({
    ratingsDb,
    throwError
});
const filterRatings = makeFilterRatings({
    ratingsDb,
    throwError
});

module.exports = {
    createRating,
    editRating,
    filterRatings
};
