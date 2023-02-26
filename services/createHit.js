const { makeHit } = require('../entities');

module.exports = {
   makeCreateHit ({ hitsDb }) {
    return async function ({ ...hitInfo }) {
      const hit = makeHit({ ...hitInfo });

      return await hitsDb.insert({
        ... hit.getAll()
      });
    };
  }
};
