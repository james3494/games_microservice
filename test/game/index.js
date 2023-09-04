const testsFunc = require("../testsFunc.js");
const postGameTests = require("./postGameTests.js");
const patchGameInvitedTests = require("./patchGameInvitedTests.js");


module.exports = () =>
  describe("Testing takeout microservice - game", () => {
    let entity = {
      location: "Brendan the Navigator",
      theme: "party",
      difficulty: 3,
      startTime: Date.now() + 24 * 60 * 60 * 1000, // starts in 24hrs
      description: "This is my first game, please come and join",
      invited: [ "clm38831h0002cjrebqfqgkca", "clm39w2hf0002glre11it9nq6" ],
      players: [
        "clm25hoqi0002jhre5soi09vx",
        "clm37kkdt0002zpreg662h9ez",
        "clm37mlxi00022cre4ukw0tn2",
        "clm37ujq700026bre6kfmdca7",
        "clm384xbp0002axre9ky0f509",
      ],
    };

    const setEntityId = (_id) => {
      entity._id = _id;
    };

    // create game tests - must stay at the top to have a game to work with for other tests
    describe("POST /game", () => {
      testsFunc({
        tests: postGameTests,
        method: "post",
        setEntityId,
        entity,
      });
    });
    // OTHER TESTS GO HERE
    // ___________________________________________________________________________________________________________________
    describe("Patch /game/:id/invited", () => {
        testsFunc({
          tests: patchGameInvitedTests,
          method: "patch",
          entity,
        });
      });


    // ___________________________________________________________________________________________________________________
    // delete game tests - must stay at the bottom to clean up
  });
