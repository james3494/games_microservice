
const returnFields = ({ _id, description, difficulty, themes }) => ({
  _id,
  description,
  difficulty,
  themes,
});

const data = require(`../data/3.js`);
const loggedInUser = {
  _id: "clm256k9w00003g5xafvyw4ld", // stub
  admin: { takeout: true },
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
    send: { loggedInUser },
    expect: {
      statusCode: 200,
      body: returnFields(data.takeoutMethods[0]),
    },
  },
  {
    should: "should return 2 elements from dataset 3. (querying themes)",
    method,
    data,
    endpoint,
    send: {
      loggedInUser,
      query: { themes: "office" },
    },
    expect: {
      statusCode: 200,
      body: [
        returnFields(data.takeoutMethods[2]),
        returnFields(data.takeoutMethods[3]),
      ],
    },
  },
];
