module.exports = {
  buildMakeTakeout({ Id, throwError, validate }) {
    return function makeTakeout({
      chaserId,
      targetId,
      gameId,
      takeoutMethodId,
      methodText,
      completedAt = null,
      status = "inProgress",
      createdOn = Date.now(),
      startedAt = Date.now(),
      _id = Id.makeId(),
    } = {}) {
      const getAll = () => ({
        createdOn,
        _id,
        status,
        takeoutMethodId,
        gameId,
        chaserId,
        targetId,
        methodText,
        completedAt,
        startedAt,
      });

      validate(getAll());

      if (completedAt && !["success", "fail"].includes(status)) {
        throwError({
          title:
            "CompletedAt must only be set if the status is 'success' or 'fail'.",
          error: "game-invalid-completedAt",
          status: 400,
        });
      }

      if (completedAt && completedAt < startedAt) {
        throwError({
          title: "completedAt must be after the game started.",
          error: "takeout-invalid-completedAt",
          status: 400,
        });
      }

      return Object.freeze({
        getCreatedOn: () => createdOn,
        getId: () => _id,
        getStatus: () => status,
        getTakeoutMethodId: () => takeoutMethodId,
        getMethodText: () => methodText,
        getGameId: () => gameId,
        getChaserId: () => chaserId,
        getTargetId: () => targetId,
        getCompletedAt: () => completedAt,
        getStartedAt: () => startedAt,
        getAll,
      });
    };
  },
};
