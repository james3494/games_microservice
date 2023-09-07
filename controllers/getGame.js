// TODO: add error handling - i.e who can access this?
// which fields to return?

module.exports = {
  buildGetGame({ filterGames, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { ...filters } = httpRequest.query;
      const { _id } = httpRequest.params;
      const loggedIn = getLoggedIn(httpRequest);

      let filterObj = {};
      if (_id) {
        filterObj = { _id };
      } else filterObj = filters;

      const filtered = await filterGames(filterObj);
      let body = filtered.map((game) => ({
          _id: game._id,
          location: game.location,
          description: game.description,
          difficulty: game.difficulty,
          theme: game.theme,
          players: game.players,
          invited: game.invited,
          admins: game.admins,
          startTime: game.startTime,
          finishTime: game.finishTime,
          maxDuration: game.maxDuration,
          status: game.status,
        }));

      if (_id) {
        if (body.length < 1) {
          throwError({
            status: 404,
            title: "game not found with specified id",
            error: "game-not-found"
          })
        }
        body = body[0];
      }

      return {
        headers: { "Content-Type": "application/json" },
        status: 200,
        body,
      };
    };
  },
};

