module.exports = {
    buildDeleteGame ({ filterGames, removeGame, throwError }) {
        return async function (httpRequest) {
            const { _id } = httpRequest.params;
            const loggedIn = httpRequest.user;

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
                    title: "You must be an admin to delete a game.",
                    error: "game-insufficient-admin",
                    status: 403
                });
            }

            if (game.status !== "awaiting") {
                throwError({
                    title: "You can only delete a game which has not yet started.",
                    error: "game-already-started",
                    status: 400
                });
            }


            const { deletedId } = await removeGame({
                _id 
            });
        
            return {
                headers: {
                    "Content-Type": "application/json" 
                },
                status: 200,
                body: {
                    deletedId 
                }
            };
        };
    }
};
  