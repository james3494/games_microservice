const {
  createPack,
  editPack,
  filterPacks,
  filterTakeoutMethods,
  filterPackPurchases,
  filterRatings,
} = require("../../services");

const { buildPostPack } = require("./postPack");
const { buildPatchPack } = require("./patchPack");
const { buildGetPack } = require("./getPack");
const { buildGetPackRating } = require("./getPackRating");

module.exports = ({ getLoggedIn, throwError }) => {
  const postPack = buildPostPack({
    createPack,
    throwError,
    getLoggedIn,
  });

  const patchPack = buildPatchPack({
    editPack,
    filterPacks,
    throwError,
    getLoggedIn,
  });

  const getPack = buildGetPack({
    filterPacks,
    throwError,
    getLoggedIn,
    filterTakeoutMethods,
    filterPackPurchases,
  });

  const getPackRating = buildGetPackRating({
    filterRatings,
  });

  return {
    postPack,
    patchPack,
    getPack,
    getPackRating,
  };
};
