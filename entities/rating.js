module.exports = {
  buildMakeRating({ Id, validate }) {
    return function ({
      takeoutMethodId,
      packId,
      takeoutId,
      likeIt, // Boolean
      difficultyRating,
      funRating,
      suitabilityRating,
      overallRating,
      additionalComments = "",
      createdBy,
      createdOn = Date.now(),
      _id = Id.makeId(),
    } = {}) {
      const getAll = () => ({
        takeoutMethodId,
        packId,
        takeoutId,
        likeIt,
        difficultyRating,
        funRating,
        suitabilityRating,
        overallRating,
        additionalComments,
        createdBy,
        createdOn,
        _id,
      });

      validate(getAll());

      return Object.freeze({
        getTakeoutMethodId: () => takeoutMethodId,
        getPackId: () => packId,
        getTakeoutId: () => takeoutId,
        getLikeIt: () => likeIt,
        getDifficultyRating: () => difficultyRating,
        getFunRating: () => funRating,
        getSuitabilityRating: () => suitabilityRating,
        getOverallRating: () => overallRating,
        getAdditionalComments: () => additionalComments,
        getCreatedBy: () => createdBy,
        getCreatedOn: () => createdOn,
        getId: () => _id,
        getAll,
      });
    };
  },
};
