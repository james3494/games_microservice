const data8 = require("../data/8.js");
const data9 = require("../data/9.js");

const loggedInUser = {
    _id: "clm256k9w00003g5xafvyw4ld", // stub
    admin: {
        takeout: true 
    }
};

module.exports = [
    // test an execute
    // -------------------------------------------------------------------------------------------------------------------
    {
        should: "execute the first takeout and respond with a success message",
        method: "put",
        data: data8,
        endpoint: `takeout/${data8.takeouts[0]._id}/executed`,
        send: {
            loggedInUser 
        },
        expect: {
            statusCode: 200
        }
    },
    {
        should:
      "The executed takeout should now have a success status and a completedAt",
        method: "get",
        endpoint: `takeout/${data8.takeouts[0]._id}`,
        send: {
            loggedInUser
        },
        expect: {
            statusCode: 200,
            body: (resBody) => {
                return (
                    resBody.status === "success" &&
          resBody.completedAt &&
          resBody.completedAt < Date.now()
                );
            }
        }
    },
    {
        should:
      "The takeout for the target should have a fail status and a completedAt",
        method: "get",
        endpoint: "takeout",
        send: {
            loggedInUser,
            query: {
                chaserId: data8.takeouts[0].targetId
            }
        },
        expect: {
            statusCode: 200,
            body: (resBody) => {
                return (
                    resBody.length == 1 &&
          resBody[0].status === "fail" &&
          resBody[0].completedAt &&
          resBody[0].completedAt < Date.now()
                );
            }
        }
    },
    {
        should: "A new takeout should have been created",
        method: "get",
        endpoint: "takeout",
        send: {
            loggedInUser,
            query: {
                chaserId: data8.takeouts[0].chaserId,
                targetId: data8.takeouts.find(
                    (takeout) => takeout.chaserId === data8.takeouts[0].targetId
                ).targetId
            }
        },
        expect: {
            statusCode: 200,
            body: (resBody) => {
                return resBody.length == 1 && resBody[0].status === "inProgress";
            }
        }
    },

    // -------------------------------------------------------------------------------------------------------------------
    // test the last execute - should also finish the game
    // -------------------------------------------------------------------------------------------------------------------
    {
        should: "throw error as cannot execute a takeout which isnt in progress",
        method: "put",
        data: data9,
        endpoint: `takeout/${data9.takeouts[0]._id}/executed`,
        send: {
            loggedInUser 
        },
        expect: {
            statusCode: 400,
            body: {
                status: 400,
                error: "takeout-invalid-status"
            }
        }
    },
    {
        should: "execute the final takeout",
        method: "put",
        data: data9,
        endpoint: `takeout/${data9.takeouts[5]._id}/executed`,
        send: {
            loggedInUser 
        },
        expect: {
            statusCode: 200
        }
    },
    {
        should: "All takeouts should have a success / fail status",
        method: "get",
        endpoint: "takeout",
        send: {
            loggedInUser,
            query: {
                gameId: data9.games[0]._id
            }
        },
        expect: {
            statusCode: 200,
            body: (resBody) => {
                let pass = true;
                resBody.forEach((takeout) => {
                    if (takeout.status !== "success" && takeout.status !== "fail") {
                        pass = false;
                    }
                });
                return pass;
            }
        }
    },
    {
        should: "All takeouts should have a completedAt",
        method: "get",
        endpoint: "takeout",
        send: {
            loggedInUser,
            query: {
                gameId: data9.games[0]._id
            }
        },
        expect: {
            statusCode: 200,
            body: (resBody) => {
                let pass = true;
                resBody.forEach((takeout) => {
                    if (!takeout.completedAt || takeout.completedAt > Date.now()) {
                        pass = false;
                    }
                });
                return pass;
            }
        }
    },
    {
        should: "The game should have a finished status and an finishTime",
        method: "get",
        endpoint: `game/${data9.games[0]._id}`,
        send: {
            loggedInUser
        },
        expect: {
            statusCode: 200,
            body: (resBody) => {
                return (
                    resBody.status === "finished" &&
          resBody.finishTime &&
          resBody.finishTime < Date.now()
                );
            }
        }
    }

    // -------------------------------------------------------------------------------------------------------------------
];
