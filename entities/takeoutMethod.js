

module.exports = {
    buildMakeTakeoutMethod ({ Id, throwError, allowedThemes = [] }) {
     return function makeTakeoutMethod ({
       description,
       createdBy,
       themes = [],
       difficulty = 3,
       disabled = false,
       createdOn = Date.now(),
       modifiedOn = Date.now(),
       _id = Id.makeId(),
     } = {}) {

       if (!Id.isValidId(_id)) {
          throwError('TakeoutMethod must have a valid id.', 400);
       }
       if (!Id.isValidId(createdBy)) {
          throwError('createdBy must be a valid id.', 400);
       }
       if (typeof disabled !== 'boolean') {
          throwError('disabled must be a boolean.', 400);
       }
       if (typeof modifiedOn !== 'number' || modifiedOn > Date.now()) {
         throwError('modifiedOn must be a number and in the past.', 400);
       }
       if (typeof createdOn !== 'number' || createdOn > Date.now()) {
         throwError('createdOn must be a number and in the past.', 400);
       }
       if (typeof description !== 'string' || description.length < 10 || description.length > 200) {
         throwError('Description must be a string between 10 and 200 characters.', 400);
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
       if (!themes.every(theme => allowedThemes.includes(theme))) {
        throwError('All themes must be one of [' + allowedThemes.reduce((string, theme) => string + ' ' + theme) + ']', 400);
       }


       return Object.freeze({
         getCreatedOn: () => createdOn,
         getModifiedOn: () => modifiedOn,
         getId: () => _id,
         getCreatedBy: () => createdBy,
         isDisabled: () => disabled,
         getThemes: () => themes,
         getDifficulty: () => difficulty,
         getDescription: () => description,
         getAll: () => ({
           createdOn,
           _id,
           disabled,
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
