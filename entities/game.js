

module.exports = {
    buildMakeGame ({ Id, throwError }) {
     return function makeGame ({
       location, // in time this can be coordinates or something chosen on a map
       startTime,
       createdBy,
       description = '',
       players = [],
       invited = [],
       admins = [],
       status = 'awaiting',
       theme,
       difficulty = 3,
       maxDuration = 100, // in ms
       finishTime,
       createdOn = Date.now(),
       modifiedOn = Date.now(),
       _id = Id.makeId(),
     } = {}) {

       if (!Id.isValidId(_id)) {
          throwError('Game must have a valid id.');
       }

       if (!Id.isValidId(createdBy)) {
          throwError('createdBy must have a valid id.');
       }
       if (typeof modifiedOn !== 'number' || modifiedOn > Date.now()) {
         throwError('modifiedOn must be a number and in the past.', 400);
       }
       if (typeof createdOn !== 'number' || createdOn > Date.now()) {
         throwError('createdOn must be a number and in the past.', 400);
       }
       if (description && (typeof description !== 'string' || description.length > 200)) {
         throwError('If description is set, it must be a string less than 200 characters.', 400);
       }
       if (typeof location !== 'string' || location.length < 2 || location.length > 60) {
         throwError('Location must be a string between 2 and 60 characters.', 400);
       }
       if (theme && (typeof theme !== 'string' || ![].includes(theme))) {
         throwError(`${theme} is not a valid theme.`, 400);
       }
       if (typeof difficulty !== 'number' || difficulty < 1 || difficulty > 5) {
         throwError('Difficulty must be a number between 1 and 5.', 400);
       }
       if (typeof startTime !== 'number') {
         throwError('startTime must be a number.', 400);
       }
       if (finishTime && (typeof finishTime !== 'number' || finishTime > Date.now() || finishTime < startTime)) {
         throwError('If finishTime is set, it must be a number, in the past, after the game started.', 400);
       }
       if (maxDuration && (typeof maxDuration !== 'number' || maxDuration < 0)) {
         throwError('If max duration is set, it must be a number greater than 0.', 400);
       }
       if (maxDuration && maxDuration + startTime < Date.now() && !finishTime) {
         throwError('The game is over its maxDuration, a finishTime must be set.', 400);
       }
       if (typeof status !== 'string' || !['inProgress', 'finished', 'awaiting'].includes(status)) {
         throwError(`${status} is not a valid status.`, 400);
       }
       if (startTime < Date.now() && !finished && status !== 'inProgress') {
         throwError(`Status must be inProgress while the game is in progress.`, 400);
       }
       if (startTime > Date.now() && status !== 'awaiting') {
         throwError(`Status must be awaiting before the game has started.`, 400);
       }
       if (finishTime && status !== 'finished') {
         throwError(`Status must be finished after the game has finished.`, 400);
       }

       // players check
       if (typeof players !== 'object' || !Array.isArray(players)) {
        throwError('Players must be an array.', 400);
       }
       if ((new Set(players)).size !== players.length) {
        throwError('Players must not be repeated.', 400);
       }
       if (!players.every(player => Id.isValidId(player))) {
        throwError('All players must have a valid ID.', 400);
       }

       // invited check
       if (typeof invited !== 'object' || !Array.isArray(invited)) {
        throwError('Invited must be an array.', 400);
       }
       if ((new Set(invited)).size !== invited.length) {
        throwError('Invited players must not be repeated.', 400);
       }
       if (!invited.every(invitee => Id.isValidId(invitee))) {
        throwError('All invited must have a valid ID.', 400);
       }
       if (!invited.every(invitee => !players.includes(invitee))) {
        throwError('You cannot invite users which are already players in the game.', 400);
       }

       // admins check
       if (typeof admins !== 'object' || !Array.isArray(admins)) {
        throwError('Admins must be an array.', 400);
       }
       if ((new Set(admins)).size !== admins.length) {
        throwError('Admins must not be repeated.', 400);
       }
       if (!admins.every(admin => Id.isValidId(admin))) {
        throwError('All admins must have a valid ID.', 400);
       }
       if (!admins.every(admin => player.includes(admin))) {
        throwError('All admins must be players in the game.', 400);
       }


       return Object.freeze({
         getCreatedOn: () => createdOn,
         getId: () => _id,
         getLocation: () => location,
         getStartTime: () => startTime,
         getFinishTime: () => finishTime,
         getMaxDuration: () => maxDuration,
         getPlayers: () => players,
         getInvited: () => invited,
         getAdmins: () => admins,
         getStatus: () => status,
         getTheme: () => theme,
         getModifiedOn: () => modifiedOn,
         getCreatedBy: () => createdBy,
         getDifficulty: () => difficulty,
         getDescription: () => description,
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
           admins,
           location,
           startTime,
           finishTime,
           maxDuration,
           status
         })
       });

     };
   }
  };
