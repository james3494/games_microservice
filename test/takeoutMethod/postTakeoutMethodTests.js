const endpoint = 'takeoutMethod'
const user_id = "clm256k9w00003g5xafvyw4ld" // stub

const postUsers = [
    (takeoutMethod) => ({
      expectedStatus: 403,
      endpoint,
      loggedInUser: {
        _id: user_id,
        admin: { takeout: false }
      },
      expectedBody: {
        error: "takeoutMethod-insufficient-admin",
        status: 403
      },
      should: "should return an error for insufficient admin permissions",
      sendBody: takeoutMethod
    }),
    (takeoutMethod) => ({
      expectedStatus: 400,
      endpoint,
      loggedInUser: {
        _id: user_id,
        admin: { takeout: true }
      },
      expectedBody: {
        error: "takeoutMethod-invalid-difficulty",
        status: 400
      },
      should: "should return an error for an invalid difficulty",
      sendBody: {
        ...takeoutMethod,
        difficulty: 11
      }
    }),
    (takeoutMethod) => ({
      expectedStatus: 400,
      endpoint,
      loggedInUser: {
        _id: user_id,
        admin: { takeout: true }
      },
      expectedBody: {
        error: "takeoutMethod-invalid-themes",
        status: 400
      },
      should: "should return an error for an invalid theme",
      sendBody: {
        ...takeoutMethod,
        themes: [ 'notARealTHeme' ]
      }
    }),
    (takeoutMethod) => ({
      expectedStatus: 201,
      endpoint,
      loggedInUser: {
        _id: user_id,
        admin: { takeout: true }
      },
      expectedBody: {
        insertedId: "notnull"
      },
      should: "should return an insertedId and a successful status. The takeoutMethod should have been created",
      sendBody: takeoutMethod,
    }),
  ]
  

  
  module.exports = postUsers