const user_id = "clm256k9w00003g5xafvyw4ld" // stub


const deleteTakeoutMethod = [
    (takeoutMethod) => ({
      expectedStatus: 403,
      endpoint: `takeoutMethod/${takeoutMethod._id}`,
      expectedBody: {
        status: 403,
        error: "takeoutMethod-insufficient-admin"
      },
      should: "should return an error about insufficient admin permissions",
      sendBody: {
        _id: takeoutMethod._id
      },
      loggedInUser: {
        _id: user_id,
        admin: { super: false }
      }
    }),
    (takeoutMethod) => ({
      expectedStatus: 200,
      endpoint: `takeoutMethod/${takeoutMethod._id}`,
      expectedBody: {
        deletedId: takeoutMethod._id
      },
      should: "should return a deletedId and a successful status",
      sendBody: {
        _id: takeoutMethod._id
      },
      loggedInUser: {
        _id: user_id,
        admin: { super: true }
      }
    }),
    (takeoutMethod) => ({
      expectedStatus: 404,
      endpoint: `takeoutMethod/${takeoutMethod._id}`,
      should: "should return a 404 as the takeoutMethod has already been deleted and can't be found",
      expectedBody: {
        error: "takeoutMethod-not-found",
        status: 404
      },
      sendBody: {
        _id: takeoutMethod._id
      },
      loggedInUser: {
        _id: user_id,
        admin: { super: true }
      }
    }),
  ]


  module.exports = deleteTakeoutMethod