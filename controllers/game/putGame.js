module.exports = {
    buildPutGame({ editGame, throwError, filterGames }) {
        return async function (httpRequest) {
            const {
                location,
                expectedStartTime,
                title,
                photos,
                description,
                packId,
                maxDuration,
                invited,
                admins
            } = httpRequest.body;

            const { _id } = httpRequest.params;

            const loggedIn = httpRequest.user;

            if (!loggedIn) {
                throwError({
                    title: "You must be logged in to edit a game.",
                    error: "game-not-logged-in",
                    status: 403
                });
            }

            const game = (await filterGames({
                _id 
            }))[0];

            if (!game) {
                throwError({
                    status: 404,
                    title: `No game found with id: ${_id}`,
                    error: "game-not-found"
                });
            }

            const isAdmin = game.admins.includes(
                loggedIn._id
            );

            if (
                !isAdmin &&
        !loggedIn.admin.super &&
        !loggedIn.admin.takeout
            ) {
                throwError({
                    title: "You must be an admin to edit a game.",
                    error: "game-insufficient-admin",
                    status: 403
                });
            }

            const { modifiedCount } = await editGame({
                _id,
                ...(location ? {
                    location 
                } : {}),
                ...(expectedStartTime ? {
                    expectedStartTime 
                } : {}),
                ...(photos ? {
                    photos 
                } : {}),
                ...(title ? {
                    title 
                } : {}),
                ...(description ? {
                    description 
                } : {}),
                ...(packId ? {
                    packId 
                } : {}),
                ...(maxDuration ? {
                    maxDuration 
                } : {}),
                ...(invited ? {
                    invited 
                } : {}),
                ...(admins ? {
                    admins 
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
