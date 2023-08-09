module.exports = {
  buildMakeGame({ Id, throwError, allowedThemes = [] }) {
    return function makeGame({
      location, // in time this can be coordinates or something chosen on a map
      startTime,
      createdBy,
      description = "",
      players = [],
      invited = [],
      admins = [],
      status = "awaiting",
      theme,
      difficulty = 3,
      maxDuration = 100, // in ms
      finishTime,
      createdOn = Date.now(),
      modifiedOn = Date.now(),
      _id = Id.makeId(),
    } = {}) {
      if (!Id.isValidId(_id)) {
        throwError({
          title: "Game must have a valid id.",
          error: "game-invalid-id",
          status: 400,
        });
      }

      if (!Id.isValidId(createdBy)) {
        throwError({
          title: "createdBy must have a valid id.",
          error: "game-invalid-createdBy",
          status: 400,
        });
      }
      if (typeof modifiedOn !== "number" || modifiedOn > Date.now()) {
        throwError({
          title: "modifiedOn must be a number and in the past.",
          error: "game-invalid-modifiedOn",
          status: 400,
        });
      }
      if (typeof createdOn !== "number" || createdOn > Date.now()) {
        throwError({
          title: "createdOn must be a number and in the past.",
          error: "game-invalid-createdOn",
          status: 400,
        });
      }
      if (
        description &&
        (typeof description !== "string" || description.length > 200)
      ) {
        throwError({
          title:
            "If description is set, it must be a string less than 200 characters.",
          error: "game-invalid-description",
          status: 400,
        });
      }
      if (
        typeof location !== "string" ||
        location.length < 2 ||
        location.length > 60
      ) {
        throwError({
          title: "Location must be a string between 2 and 60 characters.",
          error: "game-invalid-location",
          status: 400,
        });
      }
      if (
        theme &&
        (typeof theme !== "string" || !allowedThemes.includes(theme))
      ) {
        throwError({
          title: `${theme} is not a valid theme.`,
          error: "game-invalid-theme",
          status: 400,
        });
      }
      if (typeof difficulty !== "number" || difficulty < 1 || difficulty > 5) {
        throwError({
          title: "Difficulty must be a number between 1 and 5.",
          error: "game-invalid-difficulty",
          status: 400,
        });
      }
      if (typeof startTime !== "number") {
        throwError({
          title: "startTime must be a number.",
          error: "game-invalid-startTime",
          status: 400,
        });
      }
      if (
        finishTime &&
        (typeof finishTime !== "number" ||
          finishTime > Date.now() ||
          finishTime < startTime)
      ) {
        throwError({
          title:
            "If finishTime is set, it must be a number, in the past, after the game started.",
          error: "game-invalid-finishTime",
          status: 400,
        });
      }
      if (maxDuration && (typeof maxDuration !== "number" || maxDuration < 0)) {
        throwError({
          title: "If max duration is set, it must be a number greater than 0.",
          error: "game-invalid-maxDuration",
          status: 400,
        });
      }
      if (maxDuration && maxDuration + startTime < Date.now() && !finishTime) {
        throwError({
          title: "The game is over its maxDuration, a finishTime must be set.",
          error: "game-invalid-finishTime",
          status: 400,
        });
      }
      if (
        typeof status !== "string" ||
        !["inProgress", "finished", "awaiting"].includes(status)
      ) {
        throwError({
          title: `${status} is not a valid status.`,
          error: "game-invalid-status",
          status: 400,
        });
      }
      if (startTime < Date.now() && !finished && status !== "inProgress") {
        throwError({
          title: `Status must be inProgress while the game is in progress.`,
          error: "game-invalid-status",
          status: 400,
        });
      }
      if (startTime > Date.now() && status !== "awaiting") {
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

      // players check
      if (typeof players !== "object" || !Array.isArray(players)) {
        throwError({
          title: "Players must be an array.",
          error: "game-invalid-players",
          status: 400,
        });
      }
      if (new Set(players).size !== players.length) {
        throwError({
          title: "Players must not be repeated.",
          error: "game-invalid-players",
          status: 400,
        });
      }
      if (!players.every((player) => Id.isValidId(player))) {
        throwError({
          title: "All players must have a valid ID.",
          error: "game-invalid-players",
          status: 400,
        });
      }

      // invited check
      if (typeof invited !== "object" || !Array.isArray(invited)) {
        throwError({
          title: "Invited must be an array.",
          error: "game-invalid-invited",
          status: 400,
        });
      }
      if (new Set(invited).size !== invited.length) {
        throwError({
          title: "Invited players must not be repeated.",
          error: "game-invalid-invited",
          status: 400,
        });
      }
      if (!invited.every((invitee) => Id.isValidId(invitee))) {
        throwError({
          title: "All invited must have a valid ID.",
          error: "game-invalid-invited",
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

      // admins check
      if (typeof admins !== "object" || !Array.isArray(admins)) {
        throwError({
          title: "Admins must be an array.",
          error: "game-invalid-admins",
          status: 400,
        });
      }
      if (new Set(admins).size !== admins.length) {
        throwError({
          title: "Admins must not be repeated.",
          error: "game-invalid-admins",
          status: 400,
        });
      }
      if (!admins.every((admin) => Id.isValidId(admin))) {
        throwError({
          title: "All admins must have a valid ID.",
          error: "game-invalid-admins",
          status: 400,
        });
      }
      if (!admins.every((admin) => player.includes(admin))) {
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
        getAll: () => ({
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
          startTime,
          finishTime,
          maxDuration,
          status,
        }),
      });
    };
  },
};
