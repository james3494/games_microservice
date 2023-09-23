module.exports = {
  buildGetGame({ filterGames, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { ...filters } = httpRequest.query;
      const { _id } = httpRequest.params;
      const loggedIn = getLoggedIn(httpRequest);

      // if you supply one _id and a joinLink you have a pass - anything that is found is authenticated
      let joinLinkPass = false;
      let filterObj = {};

      if (_id) {
        if (filters.joinLink) joinLinkPass = true;
        filterObj = { ...filters, _id };
      } else filterObj = filters;

      const foundGames = await filterGames(filterObj);
      const loggedInIsAdmin = loggedIn.admin.takeout || loggedIn.admin.super;

      let body = foundGames
        .filter((game) => {
          // can get a game if:
          // a) you are an admin
          if (loggedInIsAdmin) return true;

          // b) you are a player in the game
          if (game.players.includes(loggedIn._id)) return true;

          // c) you are invited to the game
          if (game.invited.includes(loggedIn._id)) return true;

          // d) you supply the correct joinLink for the game
          if (joinLinkPass) return true;
          return false;
        })
        .map((game) => ({
          _id: game._id,
          location: game.location,
          description: game.description,
          photos: game.photos,
          title: game.title,
          difficulty: game.difficulty,
          theme: game.theme,
          players: game.players,
          invited: game.invited,
          admins: game.admins,
          expectedStartTime: game.expectedStartTime,
          startTime: game.startTime,
          finishTime: game.finishTime,
          maxDuration: game.maxDuration,
          status: game.status,
          ...(loggedInIsAdmin || game.admins.includes(loggedIn._id)
            ? { joinLink: game.joinLink }
            : {}),
        }));

      if (_id) {
        if (body.length < 1) {
          throwError({
            status: 404,
            title: "game not found with specified id",
            error: "game-not-found",
          });
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
