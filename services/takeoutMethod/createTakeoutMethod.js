const { makeTakeoutMethod } = require("../../entities");

module.exports = {
    makeCreateTakeoutMethod ({ takeoutMethodsDb }) {
        return async function ({ ...takeoutMethodParams }) {
            const takeoutMethod = makeTakeoutMethod({
                ...takeoutMethodParams 
            });

            return await takeoutMethodsDb.insert({
                ... takeoutMethod.getAll()
            });
        };
    }
};
