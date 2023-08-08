const { makeTakeout } = require('../entities');

module.exports = {
   makeExecuteTakeout ({ takeoutsDb, throwError, filterTakeouts, createTakeout, editTakeout, editGame }) {
    return async function ({ _id }) {
      const takeoutInfo = await takeoutsDb.findById({ _id });
      if (!takeoutInfo) {
        throwError("No takeout found to initiate.", 400);
      }
      const filteredTakeouts = filterTakeouts({
        gameId: takeoutInfo.gameId,
        status: 'inProgress',
        chaserId: takeoutInfo.targetId
      });

      if (filteredTakeouts.length !== 1) {
        throwError("No next takeout found.", 400);
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
