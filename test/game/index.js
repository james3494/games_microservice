const executeTests = require("../executeTests.js");
const postGameTests = require("./postGameTests.js");
const putGameTests = require("./putGameTests.js");
const patchGameInvitedTests = require("./patchGameInvitedTests.js");
const patchGamePlayersTests = require("./patchGamePlayersTests.js");
const deleteGameTests = require("./deleteGameTests.js");
const putGameStartTests = require("./putGameStartTests.js");
const getGameTests = require("./getGameTests.js");
const getTakeoutTests = require("./getTakeoutTests.js");
const putTakeoutExecutedTests = require("./putTakeoutExecutedTests.js");

module.exports = () => {


  describe("POST /game", () => executeTests(postGameTests));
  describe("GET /game", () => executeTests(getGameTests));
  describe("PUT /game", () => executeTests(putGameTests));
  describe("GET /takeout", () => executeTests(getTakeoutTests));
  describe("PATCH /game/:id/invited", () => executeTests(patchGameInvitedTests));
  describe("PATCH /game/:id/join/:joinLink", () => executeTests(patchGamePlayersTests));
  describe("DELETE /game/:id/invited", () => executeTests(deleteGameTests));
  describe("PUT /game/:id/started", () => executeTests(putGameStartTests));
  describe("PUT /takeout/:id/executed", () => executeTests(putTakeoutExecutedTests));

};
