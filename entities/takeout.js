module.exports = {
  buildMakeTakeout({ Id, throwError }) {
    return function makeTakeout({
      chaserId,
      targetId,
      gameId,
      takeoutMethodId,
      status = "awaiting",
      createdOn = Date.now(),
      _id = Id.makeId(),
    } = {}) {
      if (!Id.isValidId(_id)) {
        throwError({
          title: "Takeout must have a valid id.",
          error: "takeout-invalid-id",
          status: 400,
        });
      }
      if (!Id.isValidId(chaserId)) {
        throwError({
          title: "chaser must have a valid id.",
          error: "takeout-invalid-chaserId",
          status: 400,
        });
      }
      if (!Id.isValidId(targetId)) {
        throwError({
          title: "target must have a valid id.",
          error: "takeout-invalid-targetId",
          status: 400,
        });
      }
      if (!Id.isValidId(gameId)) {
        throwError({
          title: "Game must have a valid id.",
          error: "takeout-invalid-gameId",
          status: 400,
        });
      }
      if (!Id.isValidId(takeoutMethodId)) {
        throwError({
          title: "takeoutMethod must have a valid id.",
          error: "takeout-invalid-takeoutMethodId",
          status: 400,
        });
      }
      if (typeof createdOn !== "number" || createdOn > Date.now()) {
        throwError({
          title: "createdOn must be a number and in the past.",
          error: "takeout-invalid-createOn",
          status: 400,
        });
      }
      if (!["awaiting", "inProgress", "success", "fail"].includes(status)) {
        throwError({
          title: `${status} is not a valid status.`,
          error: "takeout-invalid-status",
          status: 400,
        });
      }

      return Object.freeze({
        getCreatedOn: () => createdOn,
        getId: () => _id,
        getStatus: () => status,
        getTakeoutMethodId: () => takeoutMethodId,
        getGameId: () => gameId,
        getChaserId: () => chaserId,
        getTargetId: () => targetId,
        getAll: () => ({
          createdOn,
          _id,
          status,
          takeoutMethodId,
          gameId,
          chaserId,
          targetId,
        }),
      });
    };
  },
};
