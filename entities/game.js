module.exports = {
  buildMakeGame({ Id, throwError, validation }) {
    return function makeGame({
      location, // in time this can be coordinates or something chosen on a map
      startTime,
      expectedStartTime,
      createdBy,
      title = "",
      photos = [],
      description = "",
      players = [],
      invited = [],
      admins = [],
      status = "awaiting",
      theme,
      difficulty = 3,
      maxDuration = 1000 * 60 * 60 * 4, // in ms
      finishTime,
      createdOn = Date.now(),
      modifiedOn = Date.now(),
      _id = Id.makeId(),
    } = {}) {

      const getAll = () => ({
        createdOn,
        _id,
        modifiedOn,
        createdBy,
        theme,
        difficulty,
        description,
        players,
        invited,
        admins,
        location,
        expectedStartTime,
        startTime,
        finishTime,
        maxDuration,
        status,
        title, 
        photos
      })


      Object.entries( getAll() ).forEach(([key, value]) => {
        if (!validation[key]) throwError({
          status: 500,
          title: "no validation found for " + key,
          error: "validation-missing-key"
        })
        const { passed, rule, reason } = validation[key](value)
        if ( !passed ) throwError({
          status: 400,
          error: "game-invalid-" + key,
          title: rule,
          detail: reason
        })
      })


      // validation between fields

      if (finishTime && !startTime) {
        throwError({
          title: `If finishTime is set, startTime must also be set.`,
          error: "game-invalid-startTime",
          status: 400,
        });
      }

      if (startTime && startTime < Date.now() && status !== "finished" && status !== "inProgress") {
        throwError({
          title: `Status must be inProgress while the game is in progress.`,
          error: "game-invalid-status",
          status: 400,
        });
      }
      if (startTime && startTime > Date.now() && status !== "awaiting") {
        throwError({
          title: `Status must be awaiting before the game has started.`,
          error: "game-invalid-status",
          status: 400,
        });
      }
      if (finishTime && status !== "finished") {
        throwError({
          title: `Status must be finished after the game has finished.`,
          error: "game-invalid-status",
          status: 400,
        });
      }


      if ( startTime && finishTime && finishTime < startTime ) {
        throwError({
          title:
            "finishTime must be after the game started.",
          error: "game-invalid-finishTime",
          status: 400,
        });
      }

      if (startTime && maxDuration && maxDuration + startTime < Date.now() && !finishTime) {
        throwError({
          title: "The game is over its maxDuration, a finishTime must be set.",
          error: "game-invalid-finishTime",
          status: 400,
        });
      }

      if (!invited.every((invitee) => !players.includes(invitee))) {
        throwError({
          title: "You cannot invite users which are already players in the game.",
          error: "game-invalid-invited",
          status: 400,
        });
      }

      if (!admins.every((admin) => players.includes(admin))) {
        throwError({
          title: "All admins must be players in the game.",
          error: "game-invalid-admins",
          status: 400,
        });
      }

      return Object.freeze({
        getCreatedOn: () => createdOn,
        getId: () => _id,
        getLocation: () => location,
        getExpectedStartTime: () => expectedStartTime,
        getStartTime: () => startTime,
        getFinishTime: () => finishTime,
        getMaxDuration: () => maxDuration,
        getPlayers: () => players,
        getInvited: () => invited,
        getAdmins: () => admins,
        getStatus: () => status,
        getTheme: () => theme,
        getModifiedOn: () => modifiedOn,
        getCreatedBy: () => createdBy,
        getDifficulty: () => difficulty,
        getDescription: () => description,
        getTitle: () => title,
        getPhotos: () => photos,
        getAll,
      });
    };
  },
};
