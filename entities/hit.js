

module.exports = {
    buildMakeHit ({ Id }) {
     return function makeHit ({
       chaserID,
       targetID,
       gameID,
       hitMethodID,
       status = 'inProgress',
       createdOn = Date.now(),
       _id = Id.makeId(),
     } = {}) {

       if (!Id.isValidId(_id)) {
          throw new Error('Hit must have a valid id.');
       }
       // also check whether each of the following exist
       if (!Id.isValidId(chaserID)) {
          throw new Error('hunter must have a valid id.');
        }
        if (!Id.isValidId(targetID)) {
          throw new Error('hunted must have a valid id.');
        }
        if (!Id.isValidId(gameID)) {
          throw new Error('Game must have a valid id.');
        }
        if (!Id.isValidId(hitMethodID)) {
          throw new Error('hitMethodID must have a valid id.');
        }
        if (!['inProgress', 'success', 'fail'].includes(status)) {
          throw new Error(`${status} is not a valid status.`);
        }

       return Object.freeze({
         getCreatedOn: () => createdOn,
         getId: () => _id,
         getStatus: () => status,
         getHitMethodID: () => hitMethodID,
         getGameID: () => gameID,
         getChaserID: () => chaserID,
         getTargetID: () => targetID,
         setStatus,
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

       function setStatus (newStatus) {
        if (!['inProgress', 'success', 'fail'].includes(status)) {
          throw new Error(`${status} is not a valid status.`);
        }

        if (status == 'success' || status == 'fail') {
          throw new Error(`You cannot update the status from ${status}.`);
        }
        status = newStatus;
       }

     };
   }
  };
