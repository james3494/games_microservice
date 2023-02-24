

module.exports = {
    buildMakeGame ({ Id }) {
     return function makeGame ({
       location,
       startAt,
       createdBy,
       description = '',
       players = [],
       invited = [],
       inviteLink = Id.makeId(),
       admins = [],
       status = 'awaiting',
       theme = 'general',
       difficulty = 1,
       createdOn = Date.now(),
       modifiedOn = Date.now(),
       _id = Id.makeId(),
     } = {}) {

       if (!Id.isValidId(_id)) {
          throw new Error('Game must have a valid id.');
       }

       if (!Id.isValidId(createdBy)) {
          throw new Error('createdBy must have a valid id.');
       }
       if (!Id.isValidId(inviteLink)) {
          throw new Error('inviteLink must have a valid id.');
       }


       return Object.freeze({
         getCreatedOn: () => createdOn,
         getId: () => _id,
         getLocation: () => location,
         getStartAt: () => startAt,
         getPlayers: () => players,
         getInvited: () => invited,
         getInviteLink: () => inviteLink,
         getAdmins: () => admins,
         getStatus: () => status,
         getTheme: () => theme,
         getModifiedOn: () => modifiedOn,
         getCreatedBy: () => createdBy,
         getDifficulty: () => difficulty,
         getDescription: () => description,
         initialiseGame,
         setStatus,
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
           inviteLink,
           admins,
           location,
           startAt,
           status
         })
       });


       function setStatus (newStatus) {
        if (!['inProgress', 'finished', 'awaiting'].includes(status)) {
          throw new Error(`${status} is not a valid status.`);
        }

        if (status == 'finished') {
          throw new Error(`You cannot update the status from ${status}.`);
        }
        status = newStatus;
       }

       function initialiseGame () {
         if (status !== 'awaiting') {
           throw new Error(`You can only initialise an awaiting game.`);
         }
         setStatus('inProgress');
         startAt = Date.now();
       }

     };
   }
  };
