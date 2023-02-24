

module.exports = {
    buildMakeHitMethod ({ Id }) {
     return function makeHitMethod ({
       description,
       createdBy,
       themes = [],
       difficulty = 3,
       createdOn = Date.now(),
       modifiedOn = Date.now(),
       _id = Id.makeId(),
     } = {}) {

       if (!Id.isValidId(_id)) {
          throw new Error('HitMethod must have a valid id.');
       }
       if (!Id.isValidId(createdBy)) {
          throw new Error('createdBy must be a valid id.');
       }
       if (typeof modifiedOn !== 'number' || modifiedOn > Date.now()) {
         throwError('modifiedOn must be a number and in the past.', 400);
       }
       if (typeof createdOn !== 'number' || createdOn > Date.now()) {
         throwError('createdOn must be a number and in the past.', 400);
       }
       if (typeof description !== 'string' || description.length < 20 || description.length > 200) {
         throwError('Description must be a string between 20 and 200 characters.', 400);
       }
       if (typeof difficulty !== 'number' || difficulty < 1 || difficulty > 5) {
         throwError('Difficulty must be a number between 1 and 5.', 400);
       }
       // themes check
       if (typeof themes !== 'object' || !Array.isArray(themes)) {
        throwError('Themes must be an array.', 400);
       }
       if ((new Set(themes)).size !== themes.length) {
        throwError('Themes must not be repeated.', 400);
       }
       const allowedThemes = ['admin', 'superAdmin'];
       if (!themes.every(theme => allowedThemes.includes(theme))) {
        throwError('All themes must be one of [' + allowedThemes.reduce((string, theme) => string + ' ' + theme) + ']', 400);
       }}


       return Object.freeze({
         getCreatedOn: () => createdOn,
         getModifiedOn: () => modifiedOn,
         getId: () => _id,
         getCreatedBy: () => createdBy,
         getThemes: () => themes,
         getDifficulty: () => difficulty,
         getDescription: () => description,
         getAll: () => ({
           createdOn,
           _id,
           modifiedOn,
           createdBy,
           description,
           themes,
           difficulty
         })
       });
     };
   }
  };
