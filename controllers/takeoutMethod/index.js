const {
  createTakeoutMethod,
  createManyTakeoutMethods,
  editTakeoutMethod,
  filterTakeoutMethods,
  removeTakeoutMethod,
  filterRatings
} = require("../../services");

const { buildPostTakeoutMethod } = require("./postTakeoutMethod");
const { buildPutTakeoutMethodDisabled } = require("./putTakeoutMethodDisabled");
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

  const putTakeoutMethodDisabled = buildPutTakeoutMethodDisabled({
    editTakeoutMethod,
    throwError,
    getLoggedIn,
  });

  const getTakeoutMethod = buildGetTakeoutMethod({
    filterTakeoutMethods,
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
  };
};
