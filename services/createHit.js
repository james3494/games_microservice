const { makeHit } = require('../entities');

module.exports = {
   makeCreateHit ({ takeoutsDb }) {
    return async function ({ ...hitInfo }) {
      const hit = makeHit({ ...hitInfo });

      return await takeoutsDb.insert({
        ... hit.getAll()
      });
    };
  }
};
