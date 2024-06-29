const {
    createTakeoutMethod,
    createManyTakeoutMethods,
    editTakeoutMethod,
    filterTakeoutMethods,
    removeTakeoutMethod,
    filterRatings,
    filterTakeouts
} = require("../../services");

const { buildPostTakeoutMethod } = require("./postTakeoutMethod");
const { buildPutTakeoutMethodDisabled } = require("./putTakeoutMethodDisabled");
const { buildPatchTakeoutMethod } = require("./patchTakeoutMethod");
const { buildGetTakeoutMethod } = require("./getTakeoutMethod");
const { buildGetTakeoutMethodRating } = require("./getTakeoutMethodRating");
const { buildDeleteTakeoutMethod } = require("./deleteTakeoutMethod");

module.exports = ({ throwError }) => {
    const postTakeoutMethod = buildPostTakeoutMethod({
        createTakeoutMethod,
        createManyTakeoutMethods,
        throwError
    });
    const patchTakeoutMethod = buildPatchTakeoutMethod({
        editTakeoutMethod,
        filterTakeouts,
        throwError
    });

    const putTakeoutMethodDisabled = buildPutTakeoutMethodDisabled({
        editTakeoutMethod,
        throwError
    });

    const getTakeoutMethod = buildGetTakeoutMethod({
        filterTakeoutMethods,
        filterTakeouts,
        throwError
    });
    const getTakeoutMethodRating = buildGetTakeoutMethodRating({
        filterRatings,
        throwError
    });

    const deleteTakeoutMethod = buildDeleteTakeoutMethod({
        removeTakeoutMethod,
        throwError
    });

    return {
        postTakeoutMethod,
        putTakeoutMethodDisabled,
        getTakeoutMethod,
        deleteTakeoutMethod,
        getTakeoutMethodRating,
        patchTakeoutMethod
    };
};
