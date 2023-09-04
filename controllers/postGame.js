module.exports = {
  buildPostGame({ createGame, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { ...gameInfo } = httpRequest.body;

      const { _id } = getLoggedIn(httpRequest);
      if (!_id) {
        throwError({
          title: "You must be logged in to create a game.",
          error: "game-not-logged-in",
          status: 403,
        });
      }

      const { insertedId } = await createGame({
        ...gameInfo,
        createdBy: _id,
        admins: (gameInfo.admins || []).concat(_id),
        players: (gameInfo.players || []).concat(_id),
      });


      return {
        headers: { "Content-Type": "application/json" },
        status: 201,
        body: { insertedId },
      };
    };
  },
};
