
const executeTests = require("./executeTests.js");
const doTakeoutMethodTests = require("./takeoutMethod");
const doGameTests = require("./game");
const pingTests = require("./pingTests.js");

describe("Testing takeout microservice", () => {
  // These ping tests check the microservice is online and that the call is rejected if there is an invalid api key
  describe( "GET /ping", () => executeTests(pingTests) );
  
  let game = {
    location: "Brendan the Navigator",
    theme: "party",
    difficulty: 3,
    startTime: Date.now() + 24 * 60 * 60 * 1000, // starts in 24hrs
    description: "This is my first game, please come and join",
    invited: ["clm38831h0002cjrebqfqgkca", "clm39w2hf0002glre11it9nq6"],
    players: [
      "clm25hoqi0002jhre5soi09vx",
      "clm37kkdt0002zpreg662h9ez",
      "clm37mlxi00022cre4ukw0tn2",
      "clm37ujq700026bre6kfmdca7",
      "clm384xbp0002axre9ky0f509",
    ],
  };


  doTakeoutMethodTests();
  // doGameTests(game);
});
