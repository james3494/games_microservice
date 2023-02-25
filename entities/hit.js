

module.exports = {
    buildMakeHit ({ Id, throwError }) {
     return function makeHit ({
       chaserID,
       targetID,
       gameID,
       hitMethodID,
       status = 'awaiting',
       createdOn = Date.now(),
       _id = Id.makeId(),
     } = {}) {

       if (!Id.isValidId(_id)) {
          throwError('Hit must have a valid id.');
       }
       if (!Id.isValidId(chaserID)) {
          throwError('chaser must have a valid id.');
        }
        if (!Id.isValidId(targetID)) {
          throwError('target must have a valid id.');
        }
        if (!Id.isValidId(gameID)) {
          throwError('Game must have a valid id.');
        }
        if (!Id.isValidId(hitMethodID)) {
          throwError('hitMethod must have a valid id.');
        }
        if (typeof createdOn !== 'number' || createdOn > Date.now()) {
          throwError('createdOn must be a number and in the past.', 400);
        }
        if (!['awaiting', 'inProgress', 'success', 'fail'].includes(status)) {
          throwError(`${status} is not a valid status.`);
        }

       return Object.freeze({
         getCreatedOn: () => createdOn,
         getId: () => _id,
         getStatus: () => status,
         getHitMethodID: () => hitMethodID,
         getGameID: () => gameID,
         getChaserID: () => chaserID,
         getTargetID: () => targetID,
         getAll: () => ({
           createdOn,
           _id,
           status,
           hitMethodID,
           gameID,
           chaserID,
           targetID
         })
       });


     };
   }
  };
