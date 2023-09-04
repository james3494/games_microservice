const endpoint = 'game'
const user_id = "clm256k9w00003g5xafvyw4ld" // stub

const postGame = [
    (game) => ({
      expectedStatus: 403,
      endpoint,
      loggedInUser: {
        admin: { takeout: false }
      },
      expectedBody: {
        error: "game-not-logged-in",
        status: 403
      },
      should: "should return an error for needing to be logged in to create a game",
      sendBody: game
    }),
    (game) => ({
      expectedStatus: 400,
      endpoint,
      loggedInUser: {
        _id: user_id,
      },
      expectedBody: {
        error: "game-invalid-difficulty",
        status: 400
      },
      should: "should return an error for an invalid difficulty",
      sendBody: {
        ...game,
        difficulty: 11
      }
    }),
    (game) => ({
      expectedStatus: 400,
      endpoint,
      loggedInUser: {
        _id: user_id,
      },
      expectedBody: {
        error: "game-invalid-theme",
        status: 400
      },
      should: "should return an error for an invalid theme",
      sendBody: {
        ...game,
        theme: 'notARealTHeme'
      }
    }),
    (game) => ({
      expectedStatus: 201,
      endpoint,
      loggedInUser: {
        _id: user_id,
      },
      expectedBody: {
        insertedId: "notnull"
      },
      should: "should return an insertedId and a successful status. The game should have been created",
      sendBody: game,
    }),
  ]
  

  
  module.exports = postGame