const user_id = "clm256k9w00003g5xafvyw4ld" // stub


const deleteGameTests = [
    (game) => ({
      expectedStatus: 403,
      endpoint: `game/${game._id}`,
      expectedBody: {
        status: 403,
        error: "game-insufficient-admin"
      },
      should: "should return an error about insufficient admin permissions",
      sendBody: {
        _id: game._id
      },
      loggedInUser: {
        _id: user_id,
        admin: { super: false }
      }
    }),
    (game) => ({
      expectedStatus: 200,
      endpoint: `game/${game._id}`,
      expectedBody: {
        deletedId: game._id
      },
      should: "should return a deletedId and a successful status",
      sendBody: {
        _id: game._id
      },
      loggedInUser: {
        _id: user_id,
        admin: { super: true }
      }
    }),
    (game) => ({
      expectedStatus: 404,
      endpoint: `game/${game._id}`,
      should: "should return a 404 as the game has already been deleted and can't be found",
      expectedBody: {
        error: "game-not-found",
        status: 404
      },
      sendBody: {
        _id: game._id
      },
      loggedInUser: {
        _id: user_id,
        admin: { super: true }
      }
    }),
  ]


  module.exports = deleteGameTests