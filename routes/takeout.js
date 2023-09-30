const { getTakeout, putTakeoutExecuted } = require("../controllers");

module.exports = {
  buildTakeoutRoutes: ({ makeExpressCallback, api }) => {
    api.put(
      `${process.env.PATH_ROUTE}/takeout/:_id/executed`,
      makeExpressCallback(putTakeoutExecuted)
    );
    api.put(
      `${process.env.PATH_ROUTE}/takeout/executed`,
      makeExpressCallback(putTakeoutExecuted)
    );
    api.get(
      `${process.env.PATH_ROUTE}/takeout`,
      makeExpressCallback(getTakeout)
    );
    api.get(
      `${process.env.PATH_ROUTE}/takeout/:_id`,
      makeExpressCallback(getTakeout)
    );
  },
};
