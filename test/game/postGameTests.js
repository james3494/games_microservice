const endpoint = 'game'
const method = 'post'
const data = {
  games: []
}
const loggedInUser = {
  _id: "clm256k9w00003g5xafvyw4ld"
}
const testGame = {
  _id: "clm67jlrk0005qire3wpf97tp",
  location: "Brendan the Navigator",
  theme: "party",
  difficulty: 3,
  startTime: Date.now() + 24 * 60 * 60 * 1000, // starts in 24hrs
  description: "This is my first game, please come and join",
  invited: ["clm38831h0002cjrebqfqgkca", "clm39w2hf0002glre11it9nq6"],
  players: [
    "clm25hoqi0002jhre5soi09vx",
    "clm37kkdt0002zpreg662h9ez",
    "clm37mlxi00022cre4ukw0tn2",
    "clm37ujq700026bre6kfmdca7",
    "clm384xbp0002axre9ky0f509",
  ],
};

module.exports = [
    {
      should: "should return an error for needing to be logged in to create a game",
      endpoint,
      method, 
      data,
      send: {
        body: testGame
      },
      expect: {
        statusCode: 403,
        body: {
          error: "game-not-logged-in",
          status: 403
        },
      }
    },
    {
      should: "should return an error for an invalid difficulty",
      endpoint,
      method, 
      data,
      send: {
        loggedInUser,
        body: { ...testGame, difficulty: 11 }
      },
      expect: {
        statusCode: 400,
        body: {
          error: "game-invalid-difficulty",
          status: 400
        },
      }
    },
    {
      should: "should return an error for an invalid theme",
      endpoint,
      method, 
      data,
      send: {
        loggedInUser,
        body: { ...testGame, theme: "IAMAFAKETHEME" }
      },
      expect: {
        statusCode: 400,
        body: {
          error: "game-invalid-theme",
          status: 400
        },
      }
    },
    {
      should: "should return an insertedId and a successful status. The game should have been created",
      endpoint,
      method, 
      data,
      send: {
        loggedInUser,
        body: testGame
      },
      expect: {
        statusCode: 201,
        body: { insertedId: testGame._id },
      }
    },
  ]
  

  
