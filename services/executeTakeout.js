const { makeTakeout } = require('../entities');

module.exports = {
   makeExecuteTakeout ({ takeoutsDb, throwError, filterTakeouts, createTakeout, editTakeout, editGame }) {
    return async function ({ _id }) {
      const takeoutInfo = await takeoutsDb.findById({ _id });
      if (!takeoutInfo) {
        throwError({
          title: `No takeout found to initiate.`,
          error: "takeout-not-found",
          status: 404,
        });
      }
      const filteredTakeouts = filterTakeouts({
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
        createTakeout({
          chaserId: takeoutInfo.chaserId,
          targetId: nextTakeout.targetId,
          gameId: takeoutInfo.gameId,
          takeoutMethodId: nextTakeout.takeoutMethodId,
          status: 'inProgress'
        })
      } else {
        // all takeouts completed - i's the end of the game
        editGame({
          _id: takeoutInfo.gameId,
          finishTime: Date.now(),
          status: 'finished',
        })
      }

      editTakeout({
        _id,
        status: 'success'
      })
      editTakeout({
        _id: nextTakeout._id,
        status: 'fail'
      })
    };
  }
};
