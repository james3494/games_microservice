
const patchGameInvited = [
    (game) => ({
      expectedStatus: 403,
      endpoint: `game/${game._id}/invited/${game.players?.[0] || ""}`,
      loggedInUser: {
        _id: game.players?.[0] 
      },
      expectedBody: {
        error: "game-user-not-invited",
        status: 403
      },
      should: "should return an error for needing to be invited to accept an invitation",
      sendBody: { accept: true }
    }),
    (game) => ({
      expectedStatus: 403,
      endpoint: `game/${game._id}/invited/${game.players?.[0] || ""}`,
      loggedInUser: {
        _id: game.players?.[0] 
      },
      expectedBody: {
        error: "game-user-not-invited",
        status: 403
      },
      should: "should return an error for needing to be invited to decline an invitation",
      sendBody: { accept: false }
    }),
    (game) => ({
      expectedStatus: 201,
      endpoint: `game/${game._id}/invited/${game.invited?.[0] || ""}`,
      loggedInUser: {
        _id: game.invited?.[0] 
      },
      expectedBody: {
        success: true
      },
      should: "should have successfully declined the invitation for the first invited player",
      sendBody: { accept: false }
    }),
    (game) => ({
      expectedStatus: 201,
      endpoint: `game/${game._id}/invited/${game.invited?.[1] || ""}`,
      loggedInUser: {
        _id: game.invited?.[1] 
      },
      expectedBody: {
        success: true
      },
      should: "should have successfully accepted the invitation for the second invited player",
      sendBody: { accept: true }
    })
  ]
  

  
  module.exports = patchGameInvited