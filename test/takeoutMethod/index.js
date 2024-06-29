const executeTests = require("../executeTests.js");
const postTakeoutMethodTests = require("./postTakeoutMethodTests.js");
const getTakeoutMethodTests = require("./getTakeoutMethodTests.js");
const deleteTakeoutMethodTests = require("./deleteTakeoutMethodTests.js");

module.exports = () => {
    describe("POST /takeoutMethod", () => executeTests(postTakeoutMethodTests));

    describe("GET /takeoutMethod", () => executeTests(getTakeoutMethodTests));

    describe("DELETE /takeoutMethod", () =>
        executeTests(deleteTakeoutMethodTests));
};
