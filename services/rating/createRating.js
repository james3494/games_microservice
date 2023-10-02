const { makeRating } = require('../../entities');

module.exports = {
   makeCreateRating ({ ratingsDb }) {
    return async function ({ ...ratingParams }) {
      const rating = makeRating({ ...ratingParams });

      return await ratingsDb.insert({
        ... rating.getAll()
      });
    };
  }
};
