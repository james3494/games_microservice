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

module.exports = ({ throwError, getLoggedIn }) => {
  const postTakeoutMethod = buildPostTakeoutMethod({
    createTakeoutMethod,
    createManyTakeoutMethods,
    throwError,
    getLoggedIn,
  });
  const patchTakeoutMethod = buildPatchTakeoutMethod({
    editTakeoutMethod,
    filterTakeouts,
    throwError,
    getLoggedIn,
  });

  const putTakeoutMethodDisabled = buildPutTakeoutMethodDisabled({
    editTakeoutMethod,
    throwError,
    getLoggedIn,
  });

  const getTakeoutMethod = buildGetTakeoutMethod({
    filterTakeoutMethods,
    filterTakeouts,
    throwError,
    getLoggedIn,
  });
  const getTakeoutMethodRating = buildGetTakeoutMethodRating({
    filterRatings,
    throwError,
    getLoggedIn,
  });

  const deleteTakeoutMethod = buildDeleteTakeoutMethod({
    removeTakeoutMethod,
    throwError,
    getLoggedIn,
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
