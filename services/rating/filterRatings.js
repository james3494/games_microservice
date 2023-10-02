const { makeRating } = require("../../entities");

module.exports = {
  makeFilterRatings({ ratingsDb, throwError }) {
    return async function ({ ...filters }) {
      if (typeof filters !== "object") {
        throwError({
          title: "Invalid filters.",
          error: "filters-not-object",
          status: 400,
          detail: "The filters parameter must be an object",
        });
      }

      const fromDb = await ratingsDb.smartFilter(filters);

      let rtn = [];
      // do try catch statements in a loop to prevent it dying if there's one corrupt rating
      (fromDb || []).forEach((ratingInfo) => {
        try {
          const rating = makeRating(ratingInfo);
          rtn.push(rating.getAll());
        } catch (e) {
          console.log(e);
        }
      });
      return rtn;
    };
  },
};
