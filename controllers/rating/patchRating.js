
module.exports = {
  buildPatchRating({ editRating, filterRatings, throwError }) {
    return async function (httpRequest) {
      const {
        likeIt,
        difficultyRating,
        funRating,
        suitabilityRating,
        overallRating,
        additionalComments,
      } = httpRequest.body;
      const { _id } = httpRequest.params;
      const loggedIn = httpRequest.user;

      if (!loggedIn._id) {
        throwError({
          title: "You must be logged in to edit a rating.",
          error: "rating-not-logged-in",
          status: 403,
        });
      }

      const rating = (await filterRatings({ _id }))[0]

      if (!rating) {
        throwError({
          status: 404,
          title: "No rating found with that id",
          error: "rating-not-found",
        });
      }

      if (rating.createdBy !== loggedIn._id) {
        throwError({
          status: 403,
          title: "You can only edit a rating which you created",
          error: "rating-not-allowed",
        });
      }



      const { modifiedCount } = await editRating({
        _id,
        ...(likeIt ? { likeIt } : {}),
        ...(difficultyRating ? { difficultyRating } : {}),
        ...(funRating ? { funRating } : {}),
        ...(suitabilityRating ? { suitabilityRating } : {}),
        ...(overallRating ? { overallRating } : {}),
        ...(additionalComments ? { additionalComments } : {}),
      });

      return {
        headers: { "Content-Type": "application/json" },
        status: 200,
        body: { modified: modifiedCount >= 1 }
      };
    };
  },
};
