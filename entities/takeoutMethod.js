module.exports = {
  buildMakeTakeoutMethod({ Id, throwError, validation }) {
    return function makeTakeoutMethod({
      description,
      createdBy,
      themes = [],
      difficulty = 3, // number between 1 and 10
      disabled = false,
      createdOn = Date.now(),
      modifiedOn = Date.now(),
      _id = Id.makeId(),
    } = {}) {
      
      const getAll = () => ({
        createdOn,
        _id,
        disabled,
        modifiedOn,
        createdBy,
        description,
        themes,
        difficulty,
      });

      Object.entries(getAll()).forEach(([key, value]) => {
        if (!validation[key])
          throwError({
            status: 500,
            title: "no validation found for " + key,
            error: "validation-missing-key",
          });
        const { passed, rule, reason } = validation[key](value);
        if (!passed)
          throwError({
            status: 400,
            error: "takeoutMethod-invalid-" + key,
            title: rule,
            detail: reason,
          });
      });

      return Object.freeze({
        getCreatedOn: () => createdOn,
        getModifiedOn: () => modifiedOn,
        getId: () => _id,
        getCreatedBy: () => createdBy,
        isDisabled: () => disabled,
        getThemes: () => themes,
        getDifficulty: () => difficulty,
        getDescription: () => description,
        getAll,
      });
    };
  },
};
