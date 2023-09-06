const expect = require("chai").expect;

const loggedInUser = {
  _id:  "clm256k9w00003g5xafvyw4ld", // stub
  admin: { takeout: true },
}

module.exports = [
  (() => {
    let func = (game) => ({
      expectedStatus: 201,
      endpoint: `game/${game._id}/started`,
      loggedInUser,
      expectedBody: {
        success: true,
      },
    });
    func.should =
      "should return a successful status. The game should have been initiated.";
    return func;
  })(),
  
  // (() => {
  //   let func = (game) => ({
  //     endpoint: `takeout`,
  //     method: 'get',
  //     query: { gameId: game._id },
  //     loggedInUser,
  //     expectedStatus: 200,
  //     expectedBody: (takeoutArray) => {
  //       expect(takeoutArray.length).to.be.equal(game.players.length);
  //     },
  //   });
  //   func.should =
  //     "Expect the number of takeouts created to equal the number of players in the game";
  //   return func;
  // })(),
  (() => {
    let func = (game) => ({
      endpoint: `takeout`,
      method: 'get',
      query: { gameId: game._id },
      loggedInUser,
      expectedStatus: 200,
      expectedBody: (takeoutArray) => {
        const chasers = takeoutArray.map(takeout => takeout.chaserId).sort()
        const targets = takeoutArray.map(takeout => takeout.targetId).sort()

        expect(JSON.stringify(chasers)).to.be.equal(JSON.stringify(targets))
      },
    });
    func.should =
      "Expect the set of chasers to equal the set of targets";
    return func;
  })(),
  (() => {
    let func = (game) => ({
      endpoint: `takeout`,
      method: 'get',
      query: { gameId: game._id },
      loggedInUser,
      expectedStatus: 200,
      expectedBody: (takeoutArray) => {
        const methods = takeoutArray.map(takeout => takeout.takeoutMethodId)

        expect([...new Set(methods)].length).to.be.equal(methods.length);
      },
    });
    func.should =
      "Expect the takeouts to all have different methods";
    return func;
  })(),
  (() => {
    let func = (game) => ({
      endpoint: `takeout`,
      method: 'get',
      query: { gameId: game._id },
      loggedInUser,
      expectedStatus: 200,
      expectedBody: (takeoutArray) => {
        const gameIds = [...new Set(takeoutArray.map(takeout => takeout.gameId))]
        
        expect(gameIds.length).to.be.equal(1);
        expect(gameIds[0]).to.be.equal(game._id);
      },
    });
    func.should =
      "Expect the takeouts to all have the same gameId";
    return func;
  })(),
];
