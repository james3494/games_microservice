const endpoint = 'ping';

const pingTests = [
    () => ({
        expectedStatus: 403,
        endpoint,
        expectedBody: {
            error: "takeout-microservice-invalid-api-key",
            status: 403
          },
        should: "should return an error because no api key is used",
        apiKeyOverride: null,
    }),
    () => ({
        expectedStatus: 403,
        endpoint,
        expectedBody: {
            error: "takeout-microservice-invalid-api-key",
            status: 403
          },
        should: "should return an error because the wrong api key is used",
        apiKeyOverride: "thewrongapikey",
    }),
    () => ({
        expectedStatus: 200,
        endpoint,
        should: "should return a success status because the api is online",
    }),
]




module.exports = pingTests