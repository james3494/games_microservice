const { maheHit } = require('../entities');

module.exports = {
   makeUpdateHitStatus ({ hitsDb, throwError }) {
    return async function ({ _id, newStatus }) {
      const hitInfo = await hitsDb.findById({ _id });

      if (hitInfo.status == 'success' || hitInfo.status == 'fail') {
        throwError(`You cannot update the status from ${hitInfo.status}.`, 400);
      }
      const hit = makeHit({ ...hitInfo, status: newStatus });

      return await hitsDb.update({
        _id: hit.getId(),
        status: hit.getStatus()
      });
    };
  }
};
