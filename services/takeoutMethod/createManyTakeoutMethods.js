const { makeTakeoutMethod } = require("../../entities");

module.exports = {
    makeCreateManyTakeoutMethods({ takeoutMethodsDb }) {
        return async function (takeoutMethodArr) {
            const takeoutMethods = takeoutMethodArr.map((takeoutMethodParams) => {
                const method = makeTakeoutMethod({
                    ...takeoutMethodParams 
                });
                return method.getAll();
            });

            return await takeoutMethodsDb.insertMany(takeoutMethods);
        };
    }
};
