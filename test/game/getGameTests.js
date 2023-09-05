const expect = require("chai").expect;

const ourGameInArray = (game, array) => {
  const element = array.find((el) => el._id == game._id);
  expect(element).to.not.be.an("undefined");
};

const ourGameNotInArray = (game, array) => {
  const element = array.find((el) => el._id == game._id);
  expect(element).to.be.an("undefined");
};

const loggedInUser = {
  admin: { takeout: true },
  _id: "clm256k9w00003g5xafvyw4ld", // stub
};


module.exports = [
  (() => {
    let func = (game) => ({
      expectedStatus: 200,
      loggedInUser,
      endpoint: `game/${game._id}`,
      expectedBody: (({ _id, description, difficulty, theme, location }) => ({
        _id,
        description,
        difficulty,
        theme,
        location,
      }))(game),
    });
    func.should = "should return the game with the specified _id";
    return func;
  })(),
  (() => {
    let func = (game) => ({
      endpoint: `game`,
      query: { players: game.players[0] },
      loggedInUser,
      expectedStatus: 200,
      expectedBody: (resBody) => ourGameInArray(game, resBody),
    });
    func.should =
      "should return an array which contains our created game (querying players)";
    return func;
  })(),
  (() => {
    let func = (game) => ({
      endpoint: `game`,
      query: { invited: game.invited[0] },
      loggedInUser,
      expectedStatus: 200,
      expectedBody: (resBody) => ourGameInArray(game, resBody),
    });
    func.should =
      "should return an array which contains our created game (querying invited)";
    return func;
  })(),
];
