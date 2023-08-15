
const testsFunc = require("../testsFunc.js");
const doTakeoutMethodTests = require("./takeoutMethod");
const doGameTests = require("./game");
const pingTests = require("../pingTests.js");



describe("Testing takeout microservice", () => {

    // These ping tests check the microservice is online and that the call is rejected if there is an invalid api key
    describe("GET /ping", () => {
        testsFunc({ 
            tests: pingTests, 
            method: "get",
        })
    })

    doTakeoutMethodTests()
    doGameTests()
});

