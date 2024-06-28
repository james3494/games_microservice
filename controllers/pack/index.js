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

module.exports = ({ throwError }) => {
  const postPack = buildPostPack({
    createPack,
    throwError,
  });

  const patchPack = buildPatchPack({
    editPack,
    filterGames,
    throwError,
  });

  const getPack = buildGetPack({
    filterPacks,
    throwError,
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
