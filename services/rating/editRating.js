const { makeRating } = require('../../entities');

module.exports = {
  makeEditRating ({ ratingsDb, throwError }) {
    return async function ({ ...ratingInfo }) {
      if (!ratingInfo._id) {
        throwError({
          title: `You must supply an id to edit rating.`,
          error: "rating-invalid-id",
          status: 400,
        });
      }

      const rating = await ratingsDb.findById({ _id: ratingInfo._id });
      if (!rating) {
        throwError({
          title: `No rating found with that _id.`,
          error: "rating-not-found",
          status: 404,
        });
      }

      const toEdit = makeRating({ ...rating, ...ratingInfo });

      return await ratingsDb.update({
        _id: toEdit.getId(),
        ...toEdit.getAll()
      });
    };
  }
} ;
