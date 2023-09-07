module.exports = {
  buildMakeTakeout({ Id, throwError, validation }) {
    return function makeTakeout({
      chaserId,
      targetId,
      gameId,
      takeoutMethodId,
      completedAt = null,
      status = "awaiting",
      createdOn = Date.now(),
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
        completedAt
      })


      Object.entries( getAll() ).forEach(([key, value]) => {
        if (!validation[key])
          throwError({
            status: 500,
            title: "no validation found for " + key,
            error: "validation-missing-key",
          });
        const { passed, rule, reason } = validation[key](value);
        if (!passed)
          throwError({
            status: 400,
            error: "takeout-invalid-" + key,
            title: rule,
            detail: reason,
          });
      });



      if ( completedAt && !["success", "fail"].includes(status) ) {
        throwError({
          title:
            "CompletedAt must only be set if the status is 'success' or 'fail'.",
          error: "game-invalid-completedAt",
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
        getCompletedAt: () => completedAt,
        getAll,
      });
    };
  },
};
