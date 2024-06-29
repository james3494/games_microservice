const { makePack } = require("../../entities");


module.exports = {
    makeEditPack ({ packsDb, throwError }) {
        return async function ({ ...packInfo }) {
            if (!packInfo._id) {
                throwError({
                    title: "You must supply an id to edit pack.",
                    error: "pack-invalid-id",
                    status: 400
                });
            }

            const pack = await packsDb.findById({
                _id: packInfo._id 
            });
            if (!pack) {
                throwError({
                    title: "No pack found with that _id.",
                    error: "pack-not-found",
                    status: 404
                });
            }

            const toEdit = makePack({
                ...pack, ...packInfo 
            });

            return await packsDb.update({
                _id: toEdit.getId(),
                ...toEdit.getAll(),
                modifiedOn: Date.now()
            });
        };
    }
} ;
