module.exports = {
    buildMakePack({ Id, validate }) {
        return function ({
            title = "",
            description = "",
            icon = "",
            example = "",
            difficulty = 3,
            cost = 0,
            disabled = true,
            createdBy,
            createdOn = Date.now(),
            modifiedOn = Date.now(),
            _id = Id.makeId()
        } = {}) {
            const getAll = () => ({
                title,
                description,
                icon,
                example,
                cost,
                disabled,
                createdBy,
                createdOn,
                modifiedOn,
                difficulty,
                _id
            });

            validate(getAll());

            return Object.freeze({
                getTitle: () => title,
                getDescription: () => description,
                getDifficulty: () => difficulty,
                getIcon: () => icon,
                getExample: () => example,
                getCost: () => cost,
                getDisabled: () => disabled,
                getCreatedBy: () => createdBy,
                getCreatedOn: () => createdOn,
                getModifiedOn: () => modifiedOn,
                getId: () => _id,
                getAll
            });
        };
    }
};
