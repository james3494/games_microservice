

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
        throwError({
          title: 'TakeoutMethod must have a valid id.',
          error: "takeoutMethod-invalid-id",
          status: 400,
        });
       }
       if (!Id.isValidId(createdBy)) {
        throwError({
          title: 'createdBy must be a valid id.',
          error: "takeoutMethod-invalid-createdBy",
          status: 400,
        });
       }
       if (typeof disabled !== 'boolean') {
        throwError({
          title: 'disabled must be a boolean.',
          error: "takeoutMethod-invalid-disabled",
          status: 400,
        });
       }
       if (typeof modifiedOn !== 'number' || modifiedOn > Date.now()) {
        throwError({
          title: 'modifiedOn must be a number and in the past.',
          error: "takeoutMethod-invalid-modifiedOn",
          status: 400,
        });
       }
       if (typeof createdOn !== 'number' || createdOn > Date.now()) {
        throwError({
          title: 'createdOn must be a number and in the past.',
          error: "takeoutMethod-invalid-createdOn",
          status: 400,
        });
       }
       if (typeof description !== 'string' || description.length < 10 || description.length > 200) {
        throwError({
          title: 'Description must be a string between 10 and 200 characters.',
          error: "takeoutMethod-invalid-description",
          status: 400,
        });
       }
       if (typeof difficulty !== 'number' || difficulty < 1 || difficulty > 5) {
        throwError({
          title: 'Difficulty must be a number between 1 and 5.',
          error: "takeoutMethod-invalid-difficulty",
          status: 400,
        });
       }
       // themes check
       if (typeof themes !== 'object' || !Array.isArray(themes)) {
        throwError({
          title: 'Themes must be an array.',
          error: "takeoutMethod-invalid-theme",
          status: 400,
        });
       }
       if ((new Set(themes)).size !== themes.length) {
        throwError({
          title: 'Themes must not be repeated.',
          error: "takeoutMethod-invalid-theme",
          status: 400,
        });
       }
       if (!themes.every(theme => allowedThemes.includes(theme))) {
        throwError({
          title: 'All themes must be one of [' + allowedThemes.reduce((string, theme) => string + ' ' + theme) + ']',
          error: "takeoutMethod-invalid-theme",
          status: 400,
        });
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
