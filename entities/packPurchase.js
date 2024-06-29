
module.exports = {
    buildMakePackPurchase({ Id, validate }) {
        return function ({
            packId,
            userId,
            purchasedOn = Date.now(),
            _id = Id.makeId()
        } = {}) {
            const getAll = () => ({
                packId,
                userId,
                purchasedOn,
                _id
            });

            validate(getAll());

            return Object.freeze({
                getPackId: () => packId,
                getUserId: () => userId,
                getPurchasedOn: () => purchasedOn,
                getId: () => _id,
                getAll
            });
        };
    }
};
