
const testsFunc = require("../testsFunc.js");
const postTakeoutMethodTests = require("./postTakeoutMethodTests.js");
const getTakeoutMethodTests = require("./getTakeoutMethodTests.js");



module.exports = () => describe("Testing takeout microservice - takeoutMethod", () => {
    let entity = {
        description : "Convince ~name~ to eat something from your hand",
        themes : ['party'],
        difficulty : 3, 
    }

    const setEntityId = (_id) => {
        entity._id = _id
    }


    // create takeoutMethod tests - must stay at the top to have a takeoutMethod to work with for other tests
    describe("POST /takeoutMethod", () => {
        testsFunc({ 
            tests: postTakeoutMethodTests, 
            method: "post",
            setEntityId,
            entity
        })
    })
    // OTHER TESTS GO HERE
// ___________________________________________________________________________________________________________________

    describe("GET /takeoutMethod", () => {
        testsFunc({ 
            tests: getTakeoutMethodTests, 
            method: "get",
            entity
        })
    })





// ___________________________________________________________________________________________________________________
    // delete takeoutMethod tests - must stay at the bottom to clean up

});

