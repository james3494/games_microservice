const { createRating, editRating, filterRatings, filterTakeouts } = require("../../services");

const { buildPostRating } = require("./postRating");
const { buildPatchRating } = require("./patchRating");
const { buildGetRating } = require("./getRating");

module.exports = ({ throwError }) => {
    const postRating = buildPostRating({
        createRating,
        filterTakeouts,
        throwError
    });

    const patchRating = buildPatchRating({
        editRating,
        filterRatings,
        throwError
    });

    const getRating = buildGetRating({
        filterRatings,
        throwError
    });

    return {
        postRating,
        patchRating,
        getRating
    };
};
