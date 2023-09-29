const data = require(`../data/10.js`);
const method = "put";
const game = data.games[0];
const endpoint = `game/${game._id}`;

const loggedInUser = {
  _id: game.admins[0],
};

const toUpdate = {
  location: "new location",
  expectedStartTime: Date.now(),
  title: "My new title",
  photos: ["IkhlbGxvLCB3b3JsZC4i"],
  description: "My new description",
  packId: "clm37mlxi00022cre4ukw0tn2",
  maxDuration: 1000 * 60 * 60 * 6,
  invited: ["clm67jm0n0006qire8mo0fqz0", "clm38831h0002cjrebqfqgkca"],
  admins: ["clm39w2hf0002glre11it9nq6"],
};

module.exports = [
  {
    should:
      "should return an error about insufficient admin permissions to edit a game",
    data,
    endpoint,
    method,
    send: {
      loggedInUser: { _id: game.invited[0] },
    },
    expect: {
      statusCode: 403,
      body: {
        status: 403,
        error: "game-insufficient-admin",
      },
    },
  },
  {
    should: "should return an error about the game not found",
    data,
    endpoint: `game/${game.invited[0]}`,
    method,
    send: { loggedInUser },
    expect: {
      statusCode: 404,
      body: {
        status: 404,
        error: "game-not-found",
      },
    },
  },
  // _________________________________________________________________________
  {
    should: "should return a successful status code (game has been updated)",
    data,
    endpoint,
    method,
    send: { loggedInUser, body: toUpdate },
    expect: {
      statusCode: 200,
    },
  },
  {
    should: "should return the game with updated values",
    endpoint,
    method: "get",
    send: { loggedInUser },
    expect: {
      statusCode: 200,
      body: (resBody) => {
        pass = true;
        Object.entries(toUpdate).forEach(([key, value]) => {
          if (typeof resBody[key] == "object") {
            if (JSON.stringify(resBody[key]) !== JSON.stringify(value)) {
              pass = false;
              console.log("Fail on this field: " + key);
            }
          } else if (resBody[key] !== value) {
            pass = false;
            console.log("Fail on this field: " + key);
          }
        });
        return pass;
      },
    },
  },
];
