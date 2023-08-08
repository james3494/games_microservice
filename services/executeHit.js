const { makeHit } = require('../entities');

module.exports = {
   makeExecuteHit ({ takeoutsDb, throwError, filterHits, createHit, editHit, editGame }) {
    return async function ({ _id }) {
      const hitInfo = await takeoutsDb.findById({ _id });
      if (!hitInfo) {
        throwError("No hit found to initiate.", 400);
      }
      const filteredHits = filterHits({
        gameId: hitInfo.gameId,
        status: 'inProgress',
        chaserId: hitInfo.targetId
      });

      if (filteredHits.length !== 1) {
        throwError("No next hit found.", 400);
      }
      const nextHit = filteredHits[0];

      if (nextHit.targetId !== hitInfo.chaserId) {
        createHit({
          chaserId: hitInfo.chaserId,
          targetId: nextHit.targetId,
          gameId: hitInfo.gameId,
          hitMethodId: nextHit.hitMethodId,
          status: 'inProgress'
        })
      } else {
        // all hits completed - i's the end of the game
        editGame({
          _id: hitInfo.gameId,
          finishTime: Date.now(),
          status: 'finished',
        })
      }

      editHit({
        _id,
        status: 'success'
      })
      editHit({
        _id: nextHit._id,
        status: 'fail'
      })
    };
  }
};
