const { makeHit } = require('../entities');
// status is the only editable field

module.exports = {
   makeEditHit ({ takeoutsDb, throwError }) {
    return async function ({ _id, status }) {
      const hitInfo = await takeoutsDb.findById({ _id });

      if (hitInfo.status == 'success' || hitInfo.status == 'fail') {
        throwError(`You cannot update the status from ${hitInfo.status}.`, 400);
      }
      const hit = makeHit({ ...hitInfo, status });

      return await takeoutsDb.update({
        _id: hit.getId(),
        status: hit.getStatus()
      });
    };
  }
};
