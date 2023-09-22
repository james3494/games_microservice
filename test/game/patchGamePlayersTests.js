const data = require(`../data/10.js`);
const game = data.games[0];
const method = "patch";

module.exports = [
  {
    should: "should return an error for game not found",
    method,
    data,
    endpoint: `game/incorrectgameid/join/${game.joinLink}`,
    send: {
      loggedInUser: { _id: "clm39k3yw0002agre3ubt0j1j" },
    },
    expect: {
      statusCode: 404,
      body: {
        error: "game-not-found",
        status: 404,
      },
    },
  },
  {
    should: "should return an error for the incorrect game link",
    method,
    data,
    endpoint: `game/${game._id}/join/incorrectgamelink`,
    send: {
      loggedInUser: { _id: "clm39k3yw0002agre3ubt0j1j" },
    },
    expect: {
      statusCode: 403,
      body: {
        error: "game-invalid-joinLink",
        status: 403,
      },
    },
  },
  // -------------------------------------------------------------------------------------------------------------------
  {
    should: "should return a successful status (has updated the players)",
    method,
    data,
    endpoint: `game/${game._id}/join/${game.joinLink}`,
    send: {
      loggedInUser: { _id: "clm39k3yw0002agre3ubt0j1j" },
    },
    expect: {
      statusCode: 200,
    },
  },

  {
    should:
      "should have the relevant players after the previous test added the loggedIn player",
    method: "get",
    endpoint: `game/${game._id}`,
    send: {
      loggedInUser: { _id: game.players[0] },
    },
    expect: {
      statusCode: 200,
      body: { players: game.players.concat("clm39k3yw0002agre3ubt0j1j") },
    },
  },
  // -------------------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------
  {
    should: "should return a successful status (has updated the players)",
    method,
    data,
    endpoint: `game/${game._id}/join/${game.joinLink}`,
    send: {
      loggedInUser: { _id: game.invited[0] },
    },
    expect: {
      statusCode: 200,
    },
  },

  {
    should:
      "should have the relevant players after the previous test added the loggedIn player. Should have removed the player from invited",
    method: "get",
    endpoint: `game/${game._id}`,
    send: {
      loggedInUser: { _id: game.players[0] },
    },
    expect: {
      statusCode: 200,
      body: { players: game.players.concat(game.invited[0]), invited: [] },
    },
  },
  // -------------------------------------------------------------------------------------------------------------------

];
