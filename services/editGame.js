const { makeGame } = require('../entities');

// TODO: depending on the status, some fields will no longer be editable.

module.exports = {
  makeEditGame ({ gamesDb, throwError }) {
    return async function ({ ...gameInfo }) {
      if (!gameInfo._id) {
        throwError({
          title: "You must supply an id to edit a game.",
          error: "game-invalid-id",
          status: 400,
        });
      }

      const game = await gamesDb.findById({ _id: gameInfo._id });
      if (!game) {
        throwError({
          title: "No game found with that id.",
          error: "game-not-found",
          status: 404,
        });
      }

      const toEdit = makeGame({ ...game, ...gameInfo });

      return await gamesDb.update({
        _id: toEdit.getId(),
        title: toEdit.getTitle(),
        photos: toEdit.getPhotos(),
        description: toEdit.getDescription(),
        difficulty: toEdit.getDifficulty(),
        expectedStartTime: toEdit.getExpectedStartTime(),
        maxDuration: toEdit.getMaxDuration(),
        location: toEdit.getLocation(),
        admins: toEdit.getAdmins(),
        invited: toEdit.getInvited(),
        theme: toEdit.getTheme(),
        modifiedOn: Date.now(),
      });

    };
  }
} ;
