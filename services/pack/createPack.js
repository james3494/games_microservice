const { makePack } = require('../../entities');

module.exports = {
   makeCreatePack ({ packsDb }) {
    return async function ({ ...packParams }) {
      const pack = makePack({ ...packParams });

      return await packsDb.insert({
        ... pack.getAll()
      });
    };
  }
};
