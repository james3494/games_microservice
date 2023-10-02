const executeTests = require("../executeTests.js");
const postPackTests = require("./postPackTests.js");
const getPackTests = require("./getPackTests.js");

module.exports = () => {
  describe("POST /pack", () => executeTests(postPackTests));

  describe("GET /pack", () => executeTests(getPackTests));


};
