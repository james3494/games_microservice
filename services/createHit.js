const { makeHit } = require('../entities');

module.exports = {
   makeCreateHit ({ takeOutsDb }) {
    return async function ({ ...hitInfo }) {
      const hit = makeHit({ ...hitInfo });

      return await takeOutsDb.insert({
        ... hit.getAll()
      });
    };
  }
};
