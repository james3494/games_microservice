module.exports = {
  buildPutGame({ editGame, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const {
        location,
        startTime,
        description,
        theme,
        difficulty,
        maxDuration,
        invited,
        admins
      } = httpRequest.body;

      const { _id } = httpRequest.params;
      const loggedIn = getLoggedIn(httpRequest);

      if (!loggedIn) {
        throwError({
          title: "You must be logged in to edit a game.",
          error: "game-not-logged-in",
          status: 403,
        });
      }


      // get game and check loggedIn._id is in game admins (or the user is a superadmin)
      if (!loggedIn._id !== '' && !loggedIn.admin.super && !loggedIn.admin.takeout) {
        throwError({
          title: "You must be an admin to edit a game.",
          error: "game-insufficient-admin",
          status: 403,
        });
      }

      const { modifiedCount } = await editGame({
        _id,
        ...(location ? { location } : {}),
        ...(startTime ? { startTime } : {}),
        ...(description ? { description } : {}),
        ...(theme ? { theme } : {}),
        ...(difficulty ? { difficulty } : {}),
        ...(maxDuration ? { maxDuration } : {}),
        ...(invited ? { invited } : {}),
        ...(admins ? { admins } : {})
      });

      return {
        headers: { "Content-Type": "application/json" },
        status: 201,
        body: { modifiedCount, success: true },
      };
    };
  },
};
