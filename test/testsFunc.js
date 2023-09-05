const request = require("supertest");
const { app } = require("../server.js");
const expect = require('chai').expect;

const testsFunc = ({ tests, method, editEntity, entity }) => {
    tests.forEach((test) => {
        // this is a hack - need should now but need to initialise test inside it to get updated entity
        let should = test.should || test({}).should;
        it(should, (done) => {
            test = test(entity || {})

            request(app)
            [test.method || method](`${process.env.PATH_ROUTE}/${test.endpoint}`)
            .send(test.sendBody)
            .query(test.query)
            .set(test.apiKeyOverride === null ? "X-Other" : "X-Api-Key", test.apiKeyOverride || process.env.API_KEY)
            .set("X-Current-User", JSON.stringify(test.loggedInUser || null))
            .set("Content-Type", "application/json")
            .end((error, res) => {
                try {
                    expect(res.statusCode).to.be.equal(test.expectedStatus)
                    if (typeof test.expectedBody === 'function') {
                        test.expectedBody(res.body)
                    } else {
                        Object.entries(test.expectedBody || {}).forEach(([key, value]) => {
                            if (value === null || value === "null") expect(res.body[key]).to.be.null
                            else if (value === "notnull") expect(res.body[key]).not.to.be.null
                            else if (typeof value == 'object') expect(JSON.stringify(res.body[key])).to.be.equal(JSON.stringify(value))
                            else expect(res.body[key]).to.be.equal(value)
                        })
                    }
                } catch (err) {
                    // print res.body in the case of a failed response
                    console.log("Response body: ")
                    console.log(res ? res.body : "no response body")
                    throw err
                } finally {
                    if (editEntity) editEntity(res.body)
                }

                done()
            })
        });
    })
}

module.exports = testsFunc
