module.exports = {
  buildMakeGame({ Id, throwError, validate }) {
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
      packId,
      maxDuration, // in ms
      finishTime,
      createdOn = Date.now(),
      modifiedOn = Date.now(),
      _id = Id.makeId(),
      joinLink = Id.makeId(),
    } = {}) {

      const getAll = () => ({
        createdOn,
        _id,
        modifiedOn,
        createdBy,
        packId,
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
        photos,
        joinLink
      })


      validate(getAll());


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
          title: `Status must be inProgress if a startTime is set but no finishTime is set.`,
          error: "game-invalid-status",
          status: 400,
        });
      }
      if (startTime && startTime > Date.now() && status !== "awaiting") {
        throwError({
          title: `Status must not be awaiting if a startTime is set.`,
          error: "game-invalid-status",
          status: 400,
        });
      }
      if (finishTime && status !== "finished") {
        throwError({
          title: `Status must be finished if a finishTime is set.`,
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
        getPackId: () => packId,
        getModifiedOn: () => modifiedOn,
        getCreatedBy: () => createdBy,
        getDescription: () => description,
        getTitle: () => title,
        getPhotos: () => photos,
        getJoinLink: () => joinLink,
        getAll,
      });
    };
  },
};
