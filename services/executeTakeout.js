
module.exports = {
   makeExecuteTakeout ({ takeoutsDb, throwError, filterTakeouts, createTakeout, editTakeout, editGame }) {
    return async function ({ _id }) {
      const takeoutInfo = await takeoutsDb.findById({ _id });
      if (!takeoutInfo) {
        throwError({
          title: `No takeout found to execute.`,
          error: "takeout-not-found",
          status: 404,
        });
      }
      if (takeoutInfo.status !== 'inProgress') {
        throwError({
          title: `You can only execute a takeout that is in progress.`,
          error: "takeout-invalid-status",
          status: 400,
        });
      }
      const filteredTakeouts = await filterTakeouts({
        gameId: takeoutInfo.gameId,
        status: 'inProgress',
        chaserId: takeoutInfo.targetId
      });

      if (filteredTakeouts.length !== 1) {
        throwError({
          title: `No next takeout found.`,
          error: "takeout-next-not-found",
          status: 404,
        });
      }
      const nextTakeout = filteredTakeouts[0];

      if (nextTakeout.targetId !== takeoutInfo.chaserId) {
        await createTakeout({
          chaserId: takeoutInfo.chaserId,
          targetId: nextTakeout.targetId,
          gameId: takeoutInfo.gameId,
          takeoutMethodId: nextTakeout.takeoutMethodId,
          methodText: nextTakeout.methodText,
          status: 'inProgress'
        })
      } else {
        // all takeouts completed - i's the end of the game
        await editGame({
          _id: takeoutInfo.gameId,
          finishTime: Date.now(),
          status: 'finished',
        })
      }

      await editTakeout({
        _id,
        completedAt: Date.now(),
        status: 'success'
      })
      await editTakeout({
        _id: nextTakeout._id,
        completedAt: Date.now(),
        status: 'fail'
      })

      return { sucess: true }
    };
  }
};
