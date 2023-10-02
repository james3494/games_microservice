const {
  postTakeoutMethod,
  putTakeoutMethodDisabled,
  getTakeoutMethod,
  getTakeoutMethodRating,
  deleteTakeoutMethod,
} = require("../controllers");

module.exports = {
  buildTakeoutMethodRoutes: ({ makeExpressCallback, api }) => {
    api.post(
      `${process.env.PATH_ROUTE}/takeoutMethod`,
      makeExpressCallback(postTakeoutMethod)
    );
    api.put(
      `${process.env.PATH_ROUTE}/takeoutMethod/:_id/disabled`,
      makeExpressCallback(putTakeoutMethodDisabled)
    );
    api.get(
      `${process.env.PATH_ROUTE}/takeoutMethod`,
      makeExpressCallback(getTakeoutMethod)
    );
    api.get(
      `${process.env.PATH_ROUTE}/takeoutMethod/:_id`,
      makeExpressCallback(getTakeoutMethod)
    );
    api.get(
      `${process.env.PATH_ROUTE}/takeoutMethod/:_id/rating`,
      makeExpressCallback(getTakeoutMethodRating)
    );
    api.delete(
      `${process.env.PATH_ROUTE}/takeoutMethod/:_id`,
      makeExpressCallback(deleteTakeoutMethod)
    );


  },
};
