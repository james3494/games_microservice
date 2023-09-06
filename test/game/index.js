const executeTests = require("../executeTests.js");
const postGameTests = require("./postGameTests.js");
const patchGameInvitedTests = require("./patchGameInvitedTests.js");
const deleteGameTests = require("./deleteGameTests.js");
const putGameStartTests = require("./putGameStartTests.js");
const getGameTests = require("./getGameTests.js");
const getTakeoutTests = require("./getTakeoutTests.js");

module.exports = () => {


  describe("POST /game", () => executeTests(postGameTests));
  describe("GET /game", () => executeTests(getGameTests));
  describe("GET /takeout", () => executeTests(getTakeoutTests));
  describe("PATCH /game/:id/invited", () => executeTests(patchGameInvitedTests));
  describe("DELETE /game/:id/invited", () => executeTests(deleteGameTests));


  // describe("PUT /game/:id/started", () => {
  //   testsFunc({
  //     tests: putGameStartTests,
  //     method: "put",
  //     entity,
  //   });
  // });

};
