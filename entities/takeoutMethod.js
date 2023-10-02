module.exports = {
  buildMakeTakeoutMethod({ Id, validate }) {
    return function makeTakeoutMethod({
      description,
      createdBy,
      packId,
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
        packId,
      });

      validate(getAll())


      return Object.freeze({
        getCreatedOn: () => createdOn,
        getModifiedOn: () => modifiedOn,
        getId: () => _id,
        getCreatedBy: () => createdBy,
        isDisabled: () => disabled,
        getPackId: () => packId,
        getDescription: () => description,
        getAll,
      });
    };
  },
};
