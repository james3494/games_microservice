const endpoint = "pack";
const method = "post";
const user_id = "clm256k9w00003g5xafvyw4ld"; // stub
const data = {
  packs: []
}
const loggedInUser = {
  _id: user_id,
  admin: { takeout: true },
}

const testPack = {
  disabled: false,
  description: "Apack that I use for testing - best played in the test environment",
  example: "",
  title: "My test pack",
  difficulty: 3,
  cost: 2
}

module.exports = [
  {
    should: "should return an error for insufficient admin permissions",
    endpoint,
    method,
    data,
    send: {
      loggedInUser: { ...loggedInUser, admin: {} },
      body: testPack
    },
    expected: {
      statusCode: 403,
      body: {
        error: "pack-insufficient-admin",
        status: 403,
      },
    },
  },

  {
    should: "should return an insertedId and a successful status. The pack should have been created",
    endpoint,
    method,
    data,
    send: {
      loggedInUser,
      body: testPack
    },
    expected: {
      statusCode: 201,
      body: {
        insertedId: testPack._id,
        success: true
      },
    },
  },
];
