const {
  createPack,
  editPack,
  filterPacks,
  filterTakeoutMethods,
  filterPackPurchases,
  filterRatings,
  filterGames
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
    filterGames,
    throwError,
    getLoggedIn,
  });

  const getPack = buildGetPack({
    filterPacks,
    throwError,
    getLoggedIn,
    filterTakeoutMethods,
    filterPackPurchases,
    filterGames
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
