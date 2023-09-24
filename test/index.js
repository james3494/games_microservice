
const doGameTests = require("./game");
const doPingTests = require("./ping");

describe("Testing games microservice", () => {

  doPingTests();
  doGameTests();
});
