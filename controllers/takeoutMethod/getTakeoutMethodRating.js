// should we also pass in the pack id?

module.exports = {
  buildGetTakeoutMethodRating({ filterRatings, throwError }) {
    return async function (httpRequest) {
      const { _id } = httpRequest.params;
      const loggedIn = httpRequest.user;

      const foundRatings = await filterRatings({ takeoutMethodId: _id });
      const loggedInIsAdmin = loggedIn && loggedIn.admin.takeout || loggedIn.admin.super;

      if (!loggedInIsAdmin) {
        throwError({
          title: "You must be an admin to get the ratings of a specific takeoutMethod.",
          error: "rating-insufficient-admin",
          status: 403,
        });
      }

      const average = (ratingType) => {
        const ratings = foundRatings
          .map((el) => el[ratingType])
          .filter((el) => el !== undefined)
          .map((el) => {
            if (el === true) return 1;
            if (el === false) return 0;
          });
        if (!ratings.length) return { ratings: 0, average: 0 };
        else
          return {
            ratings: ratings.length,
            average: ratings.reduce((a, b) => a + b) / ratings.length,
          };
      };

      const body = {
        difficultyRating: average("difficultyRating"),
        funRating: average("funRating"),
        suitabilityRating: average("suitabilityRating"),
        overallRating: average("overallRating"),
        likeIt: average("likeIt"),
      }


      return {
        headers: { "Content-Type": "application/json" },
        status: 200,
        body,
      };
    };
  },
};
