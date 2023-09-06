const expect = require("chai").expect;

const loggedInUser = {
  _id:  "clm256k9w00003g5xafvyw4ld", // stub
  admin: { takeout: true },
}

module.exports = [
  (() => {
    let func = (game) => ({
      endpoint: `takeout/${takeoutId}/executed`,
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
];
