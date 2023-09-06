const endpoint = "ping";
const method = "get";

const pingTests = [
  {
    should: "should return an error because no api key is used",
    endpoint,
    method,
    send: { apiKey: null },
    expect: {
      body: {
        error: "takeout-microservice-invalid-api-key",
        status: 403,
      },
      statusCode: 403,
    },
  },
  {
    should: "should return an error because the wrong api key is used",
    endpoint,
    method,
    send: { apiKey: "thewrongapikey" },
    expect: {
      body: {
        error: "takeout-microservice-invalid-api-key",
        status: 403,
      },
      statusCode: 403,
    },
  },
  {
    should: "should return a success status because the api is online",
    endpoint,
    method,
    expect: { statusCode: 200 },
  },
];

module.exports = pingTests;
