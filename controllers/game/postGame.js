module.exports = {
    buildPostGame({ createGame, throwError }) {
        return async function (httpRequest) {
            const { ...gameInfo } = httpRequest.body;

            const loggedIn = httpRequest.user;
            if (!loggedIn) {
                throwError({
                    title: "You must be logged in to create a game.",
                    error: "game-not-logged-in",
                    status: 403
                });
            }

            const { insertedId } = await createGame({
                ...gameInfo,
                createdBy: loggedIn._id,
                admins: (gameInfo.admins || []).concat(loggedIn._id),
                players: (gameInfo.players || []).concat(loggedIn._id)
            });


            return {
                headers: {
                    "Content-Type": "application/json" 
                },
                status: 201,
                body: {
                    insertedId 
                }
            };
        };
    }
};
