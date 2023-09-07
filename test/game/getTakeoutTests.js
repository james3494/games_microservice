const returnFields = ({
  _id,
  gameId,
  chaserId,
  targetId,
  takeoutMethodId,
  status,
  completedAt
}) => ({
  _id,
  gameId,
  chaserId,
  targetId,
  takeoutMethodId,
  status,
  completedAt
});

const data = require(`../data/6.js`);
const loggedInUser = {
  _id: "clm256k9w00003g5xafvyw4ld",
  admin: { takeout: true },
};
const method = "get";
const endpoint = "takeout";

module.exports = [
  {
    should: "should return an object corresponding to the takeout requested",
    method,
    data,
    endpoint: `${endpoint}/${data.takeouts[0]._id}`,
    send: { loggedInUser },
    expect: {
      statusCode: 200,
      body: returnFields(data.takeouts[0]),
    },
  },
  {
    should: "querying gameId",
    method,
    data,
    endpoint,
    send: {
      loggedInUser,
      query: { gameId: "clm67jlrk0005qire3wpf97tp" },
    },
    expect: {
      statusCode: 200,
      body: [
        returnFields(data.takeouts[0]),
        returnFields(data.takeouts[1]),
        returnFields(data.takeouts[2]),
        returnFields(data.takeouts[4]),
        returnFields(data.takeouts[5]),
      ],
    },
  },
  {
    should: "querying chaserId",
    method,
    data,
    endpoint,
    send: {
      loggedInUser,
      query: { chaserId: "clm384xbp0002axre9ky0f509" },
    },
    expect: {
      statusCode: 200,
      body: [returnFields(data.takeouts[0]), returnFields(data.takeouts[2])],
    },
  },
  {
    should: "querying gameId and chaserId",
    method,
    data,
    endpoint,
    send: {
      loggedInUser,
      query: {
        gameId: "clm67jlrk0005qire3wpf97tp",
        chaserId: "clm39w2hf0002glre11it9nq6",
      },
    },
    expect: {
      statusCode: 200,
      body: [returnFields(data.takeouts[1])],
    },
  },
  {
    should: "querying gameId and targetId and status",
    method,
    data,
    endpoint,
    send: {
      loggedInUser,
      query: {
        status: "success",
        gameId: "clm67jlrk0005qire3wpf97tp",
        targetId: "clm37kkdt0002zpreg662h9ez",
      },
    },
    expect: {
      statusCode: 200,
      body: [returnFields(data.takeouts[0])],
    },
  },
  {
    should: "querying status",
    method,
    data,
    endpoint,
    send: {
      loggedInUser,
      query: { status: "inProgress" },
    },
    expect: {
      statusCode: 200,
      body: [
        returnFields(data.takeouts[1]),
        returnFields(data.takeouts[2]),
        returnFields(data.takeouts[3]),
        returnFields(data.takeouts[4]),
    ],
    },
  },
  {
    should: "querying double status",
    method,
    data,
    endpoint,
    send: {
      loggedInUser,
      query: { status: ["success", "fail"] },
    },
    expect: {
      statusCode: 200,
      body: [
        returnFields(data.takeouts[0]),
        returnFields(data.takeouts[5]),
      ],
    },
  },
];
