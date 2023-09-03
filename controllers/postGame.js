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

      const { insertedId } = await createGame({ createdBy: _id, ...gameInfo });

      return {
        headers: { "Content-Type": "application/json" },
        status: 201,
        body: { insertedId },
      };
    };
  },
};
