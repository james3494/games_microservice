const { makeTakeout } = require('../entities');
// status is the only editable field

module.exports = {
   makeEditTakeout ({ takeoutsDb, throwError }) {
    return async function ({ _id, status }) {
      const takeoutInfo = await takeoutsDb.findById({ _id });

      if (takeoutInfo.status == 'success' || takeoutInfo.status == 'fail') {
        throwError({
          title: `You cannot update the status from ${takeoutInfo.status}.`,
          error: "takeout-status-fixed",
          status: 400,
        });
      }
      const takeout = makeTakeout({ ...takeoutInfo, status });

      return await takeoutsDb.update({
        _id: takeout.getId(),
        status: takeout.getStatus()
      });
    };
  }
};
