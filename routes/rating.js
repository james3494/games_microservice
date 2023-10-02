const {
    postRating,
    patchRating,
    getRating,
  } = require("../controllers");
  
  module.exports = {
    buildRatingRoutes: ({ makeExpressCallback, api }) => {
      api.post(
        `${process.env.PATH_ROUTE}/rating`,
        makeExpressCallback(postRating)
      );
      api.patch(
        `${process.env.PATH_ROUTE}/rating/:_id`,
        makeExpressCallback(patchRating)
      );
      api.get(
        `${process.env.PATH_ROUTE}/rating`,
        makeExpressCallback(getRating)
      );
      api.get(
        `${process.env.PATH_ROUTE}/rating/:_id`,
        makeExpressCallback(getRating)
      );

    },
  };
  