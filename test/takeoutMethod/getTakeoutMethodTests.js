const expect = require("chai").expect;

const ourTakeoutMethodInArray = (takeoutMethod, array) => {
  const element = array.find((el) => el._id == takeoutMethod._id);
  expect(element).to.not.be.an("undefined");
};

const ourTakeoutMethodNotInArray = (takeoutMethod, array) => {
  const element = array.find((el) => el._id == takeoutMethod._id);
  expect(element).to.be.an("undefined");
};


const loggedInUser = {
  _id: "clm256k9w00003g5xafvyw4ld",  // stub
  admin: { takeout: true },
};

const getTakeoutMethods = [
  (takeoutMethod) => ({
    expectedStatus: 200,
    loggedInUser,
    endpoint: `takeoutMethod/${takeoutMethod._id}`,
    expectedBody: {
      _id: takeoutMethod._id,
      description: takeoutMethod.description,
      difficulty: takeoutMethod.difficulty,
      themes: takeoutMethod.themes,
    },
    should: "should return an object of the one takeoutMethod we have created",
  }),
  (takeoutMethod) => ({
    expectedStatus: 200,
    loggedInUser,
    endpoint: `takeoutMethod`,
    expectedBody: (resBody) => ourTakeoutMethodInArray(takeoutMethod, resBody),
    should:
      "should return an array which contains our created takeoutMethod (querying themes)",
    query: {
      themes: takeoutMethod?.themes?.[0],
    },
  }),
  (takeoutMethod) => ({
    expectedStatus: 200,
    loggedInUser,
    endpoint: `takeoutMethod`,
    expectedBody: (resBody) => ourTakeoutMethodInArray(takeoutMethod, resBody),
    should:
      "should return an array which contains our created takeoutMethod (querying difficulty)",
    query: {
      difficulty: takeoutMethod?.difficulty,
    },
  }),
  (takeoutMethod) => ({
    expectedStatus: 200,
    loggedInUser,
    endpoint: `takeoutMethod`,
    expectedBody: (resBody) => ourTakeoutMethodInArray(takeoutMethod, resBody),
    should:
      "should return an array which contains our created takeoutMethod (querying section of description)",
    query: {
      description: takeoutMethod?.description?.substring(
        3,
        takeoutMethod.description?.length
      ),
    },
  }),
  (takeoutMethod) => ({
    expectedStatus: 200,
    loggedInUser,
    endpoint: `takeoutMethod`,
    expectedBody: (resBody) => ourTakeoutMethodInArray(takeoutMethod, resBody),
    should:
      "should return an array which contains our created takeoutMethod (querying themes and difficulty)",
    query: {
      difficulty: takeoutMethod?.difficulty,
      themes: takeoutMethod?.themes?.[0],
    },
  }),

  (takeoutMethod) => ({
    expectedStatus: 200,
    loggedInUser,
    endpoint: `takeoutMethod`,
    expectedBody: (resBody) =>
      ourTakeoutMethodNotInArray(takeoutMethod, resBody),
    should:
      "should return an array which does NOT contain our created takeoutMethod (querying themes with wrong difficulty)",
    query: {
      difficulty: takeoutMethod?.difficulty + 1,
      themes: takeoutMethod?.themes?.[0],
    },
  }),
  (takeoutMethod) => ({
    expectedStatus: 200,
    loggedInUser,
    endpoint: `takeoutMethod`,
    expectedBody: (resBody) =>
      ourTakeoutMethodNotInArray(takeoutMethod, resBody),
    should:
      "should return an array which does NOT contain our created takeoutMethod (querying difficulty with wrong themes)",
    query: {
      difficulty: takeoutMethod?.difficulty,
      themes: takeoutMethod?.themes?.[0] + "a",
    },
  }),
];

module.exports = getTakeoutMethods;
