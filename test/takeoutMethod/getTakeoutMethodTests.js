const returnFields = ({ _id, description, packId, numberPlays }) => ({
    _id,
    description,
    packId,
    numberPlays
});

const data = require("../data/11.js");
const loggedInUser = {
    _id: "clm256k9w00003g5xafvyw4ld", // stub
    admin: {
        takeout: true 
    }
};
const method = "get";
const endpoint = "takeoutMethod";

module.exports = [
    {
        should:
      "should return an object corresponding to the takeoutMethod requested",
        method,
        data,
        endpoint: `${endpoint}/${data.takeoutMethods[0]._id}`,
        send: {
            loggedInUser 
        },
        expect: {
            statusCode: 200,
            body: returnFields({
                ...data.takeoutMethods[0], numberPlays: 0 
            })
        }
    }
];
