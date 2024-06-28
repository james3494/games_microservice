const { createRating, editRating, filterRatings, filterTakeouts } = require("../../services");

const { buildPostRating } = require("./postRating");
const { buildPatchRating } = require("./patchRating");
const { buildGetRating } = require("./getRating");

module.exports = ({ throwError }) => {
  const postRating = buildPostRating({
    createRating,
    filterTakeouts,
    throwError,
    getLoggedIn,
  });

  const patchRating = buildPatchRating({
    editRating,
    filterRatings,
    throwError,
    getLoggedIn,
  });

  const getRating = buildGetRating({
    filterRatings,
    throwError,
    getLoggedIn,
  });

  return {
    postRating,
    patchRating,
    getRating,
  };
};
