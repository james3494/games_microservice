const testsFunc = require("../testsFunc.js");
const postTakeoutMethodTests = require("./postTakeoutMethodTests.js");
const getTakeoutMethodTests = require("./getTakeoutMethodTests.js");
const deleteTakeoutMethodTests = require("./deleteTakeoutMethodTests.js");

module.exports = (entity) => {
  const editEntity = (body) => {
    if (body.insertedId) entity._id = body.insertedId;
  };

  // create takeoutMethod tests - must stay at the top to have a takeoutMethod to work with for other tests
  describe("POST /takeoutMethod", () => {
    testsFunc({
      tests: postTakeoutMethodTests,
      method: "post",
      editEntity,
      entity,
    });
  });
  // OTHER TESTS GO HERE
  // ___________________________________________________________________________________________________________________

  describe("GET /takeoutMethod", () => {
    testsFunc({
      tests: getTakeoutMethodTests,
      method: "get",
      entity,
    });
  });

  // ___________________________________________________________________________________________________________________
  // delete takeoutMethod tests - must stay at the bottom to clean up
  describe("DELETE /takeoutMethod", () => {
    testsFunc({
      tests: deleteTakeoutMethodTests,
      method: "delete",
      entity,
    });
  });
};
