const { maheHit } = require('../entities');

module.exports = {
   makeCreateHit ({ hitsDb }) {
    return async function ({ ...hitInfo }) {
      const hit = makeHit({ ...hitInfo });

      return hitsDb.insert({
        ... hit.getAll()
      });
    };
  }
};
