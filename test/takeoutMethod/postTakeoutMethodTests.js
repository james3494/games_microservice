const endpoint = "takeoutMethod";
const method = "post";
const user_id = "clm256k9w00003g5xafvyw4ld"; // stub
const data = require(`../data/2.js`);
const loggedInUser = {
  _id: user_id,
  admin: { takeout: true },
}

const testTakeoutMethod = {
  _id: "clm39jnfi00029wrebr2vavh0",
  createdOn: 1693734089310,
  disabled: false,
  modifiedOn: 1693734089310,
  createdBy: user_id,
  description: "Convince ~name~ to eat something from your hand",
  themes: ["party"],
  difficulty: 3,
}

module.exports = [
  {
    should: "should return an error for insufficient admin permissions",
    endpoint,
    method,
    data,
    send: {
      loggedInUser: { ...loggedInUser, admin: {} },
      body: testTakeoutMethod
    },
    expected: {
      statusCode: 403,
      body: {
        error: "takeoutMethod-insufficient-admin",
        status: 403,
      },
    },
  },
  {
    should: "should return an error for an invalid difficulty",
    endpoint,
    method,
    data,
    send: {
      loggedInUser,
      body: {
        ...testTakeoutMethod,
        difficulty: 11
      }
    },
    expected: {
      statusCode: 400,
      body: {
        error: "takeoutMethod-invalid-difficulty",
        status: 400,
      },
    },
  },
  {
    should: "should return an error for an invalid theme",
    endpoint,
    method,
    data,
    send: {
      loggedInUser,
      body: {
        ...testTakeoutMethod,
        themes: [ 'notARealTHeme' ]
      }
    },
    expected: {
      statusCode: 400,
      body: {
        error: "takeoutMethod-invalid-theme",
        status: 400,
      },
    },
  },
  {
    should: "should return an insertedId and a successful status. The takeoutMethod should have been created",
    endpoint,
    method,
    data,
    send: {
      loggedInUser,
      body: testTakeoutMethod
    },
    expected: {
      statusCode: 201,
      body: {
        insertedId: "clm39jnfi00029wrebr2vavh0",
        success: true
      },
    },
  },
];
