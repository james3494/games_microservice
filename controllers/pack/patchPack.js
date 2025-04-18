// to do - work out when this should be allowed to be edited or not

module.exports = {
    buildPatchPack({
        editPack,
        filterGames,
        throwError
    }) {
        return async function (httpRequest) {
            const { title, description, icon, example, difficulty, cost, disabled, requiredPurchase } =
        httpRequest.body;
            const { _id } = httpRequest.params;
            const loggedIn = httpRequest.user;

            if (!loggedIn._id) {
                throwError({
                    title: "You must be logged in to edit a pack.",
                    error: "pack-not-logged-in",
                    status: 403
                });
            }
            if (!loggedIn.admin.takeout && !loggedIn.admin.super) {
                throwError({
                    title: "You must be an admin to create a pack.",
                    error: "pack-insufficient-admin",
                    status: 403
                });
            }

            const games = await filterGames({
                packId: _id 
            });

            

            const { modifiedCount } = await editPack({
                _id,
                ...(title ? {
                    title 
                } : {}),
                ...(description ? {
                    description 
                } : {}),
                ...(icon ? {
                    icon 
                } : {}),
                ...(cost ? {
                    cost 
                } : {}),
                ...(example ? {
                    example 
                } : {}),
                ...(difficulty !== undefined ? {
                    difficulty 
                } : {}),
                ...(disabled !== undefined ? {
                    disabled 
                } : {}),
                ...(requiredPurchase !== undefined ? {
                    requiredPurchase 
                } : {})
            });

            return {
                headers: {
                    "Content-Type": "application/json" 
                },
                status: 200,
                body: {
                    modified: modifiedCount >= 1 
                }
            };
        };
    }
};
