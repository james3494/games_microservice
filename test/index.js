
const doGameTests = require("./game");
const doTakeoutMethodTests = require("./takeoutMethod");
const doPingTests = require("./ping");

describe("Testing games microservice", () => {

  doPingTests();
  doGameTests();
  doTakeoutMethodTests();
});
