const returnFields = ({
    _id,
    title,
    description,
    icon,
    example,
    cost,
    disabled,
    difficulty,
    numberTakeoutMethods,
    numberPurchases,
    numberPlays
}) => ({
    _id,
    title,
    description,
    icon,
    example,
    cost,
    disabled,
    difficulty,
    numberTakeoutMethods,
    numberPurchases,
    numberPlays
});

const data = require("../data/12.js");
const loggedInUser = {
    _id: "clm256k9w00003g5xafvyw4ld", // stub
    admin: {
        takeout: true 
    }
};
const method = "get";
const endpoint = "pack";

module.exports = [
    {
        should: "should return an object corresponding to the pack requested",
        method,
        data,
        endpoint: `${endpoint}/${data.packs[0]._id}`,
        send: {
            loggedInUser 
        },
        expect: {
            statusCode: 200,
            body: returnFields({
                ...data.packs[0],
                numberTakeoutMethods: 4,
                numberPlays: data.games.length,
                numberPurchases: data.packPurchases.length
            })
        }
    }
];
