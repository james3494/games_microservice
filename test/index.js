
const doGameTests = require("./game");
const doTakeoutMethodTests = require("./takeoutMethod");
const doPackTests = require("./pack");
const doPingTests = require("./ping");

describe("Testing games microservice", () => {

  doPingTests();
  doGameTests();
  doTakeoutMethodTests();
  doPackTests();
});
