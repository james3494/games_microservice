const testsFunc = require("../testsFunc.js");
const postGameTests = require("./postGameTests.js");
const patchGameInvitedTests = require("./patchGameInvitedTests.js");
const deleteGameTests = require("./deleteGameTests.js");
const putGameStartTests = require("./putGameStartTests.js");
const getGameTests = require("./getGameTests.js");

module.exports = (entity) => {
  const editEntity = (body) => {
    if (body.insertedId) entity._id = body.insertedId;
  };

  // create game tests - must stay at the top to have a game to work with for other tests
  describe("POST /game", () => {
    testsFunc({
      tests: postGameTests,
      method: "post",
      editEntity,
      entity,
    });
  });
  // OTHER TESTS GO HERE
  // ___________________________________________________________________________________________________________________
  describe("GET /game", () => {
    testsFunc({
      tests: getGameTests,
      method: "get",
      entity,
    });
  });

  describe("PATCH /game/:id/invited", () => {
    testsFunc({
      tests: patchGameInvitedTests,
      method: "patch",
      entity,
    });
  });

  describe("PUT /game/:id/started", () => {
    testsFunc({
      tests: putGameStartTests,
      method: "put",
      entity,
    });
  });

  // ___________________________________________________________________________________________________________________
  // delete game tests - must stay at the bottom to clean up

  describe("DELETE /game/:id", () => {
    testsFunc({
      tests: deleteGameTests,
      method: "delete",
      entity,
    });
  });
};
