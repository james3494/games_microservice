const returnFields = ({ _id, location, description, difficulty, theme, players, invited, title, photos, joinLink, admins, startTime, expectedStartTime, maxDuration, status, finishTime }) => ({
  _id,
  location,
  description,
  difficulty,
  theme,
  players,
  invited,
  admins,
  startTime, 
  expectedStartTime,
  maxDuration,
  status,
  finishTime,
  title,
  photos, 
  joinLink,
});

const data = require(`../data/4.js`);
const loggedInUser = {
  _id: "clm256k9w00003g5xafvyw4ld", 
  admin: { takeout: true },
}
const method = "get";
const endpoint = "game";

module.exports = [
  {
    should:
      "should return an object corresponding to the game requested",
    method,
    data,
    endpoint: `${endpoint}/${data.games[0]._id}`,
    send: { loggedInUser },
    expect: {
      statusCode: 200,
      body: returnFields(data.games[0]),
    },
  },
  {
    should: "should return 2 elements from dataset 4. (querying invited)",
    method,
    data,
    endpoint,
    send: {
      loggedInUser,
      query: { invited: "clm38831h0002cjrebqfqgkca" },
    },
    expect: {
      statusCode: 200,
      body: [
        returnFields(data.games[2]),
        returnFields(data.games[5]),
      ],
    },
  },
  {
    should: "should return 4 elements from dataset 4. (querying players)",
    method,
    data,
    endpoint,
    send: {
      loggedInUser,
      query: { players: "clm39w2hf0002glre11it9nq6" },
    },
    expect: {
      statusCode: 200,
      body: [
        returnFields(data.games[0]),
        returnFields(data.games[1]),
        returnFields(data.games[3]),
        returnFields(data.games[5]),
      ],
    },
  },
  {
    should: "should return 4 elements from dataset 4. (querying status)",
    method,
    data,
    endpoint,
    send: {
      loggedInUser,
      query: { status: "awaiting" },
    },
    expect: {
      statusCode: 200,
      body: [
        returnFields(data.games[0]),
        returnFields(data.games[1]),
        returnFields(data.games[2]),
        returnFields(data.games[3]),
      ],
    },
  },
  {
    should: "should return 2 elements from dataset 4. (querying double status)",
    method,
    data,
    endpoint,
    send: {
      loggedInUser,
      query: { status: ["inProgress", "finished"] },
    },
    expect: {
      statusCode: 200,
      body: [
        returnFields(data.games[4]),
        returnFields(data.games[5]),
      ],
    },
  },
  {
    should: "should return 1 element from dataset 4. (querying location)",
    method,
    data,
    endpoint,
    send: {
      loggedInUser,
      query: { location: "Jeffrey the" },
    },
    expect: {
      statusCode: 200,
      body: [
        returnFields(data.games[5]),
      ],
    },
  },
  {
    should: "should return 3 elements from dataset 4. (querying players and status)",
    method,
    data,
    endpoint,
    send: {
      loggedInUser,
      query: { players: "clm39w2hf0002glre11it9nq6", status: "awaiting" },
    },
    expect: {
      statusCode: 200,
      body: [
        returnFields(data.games[0]),
        returnFields(data.games[1]),
        returnFields(data.games[3]),
      ],
    },
  },
];
