const data = require("../data/7.js");
const game = data.games[0];
const purchase = data.packPurchases[0];

const loggedInUser = {
    _id: purchase.userId,
    admin: {
        takeout: true 
    }
};

module.exports = [
    {
        should: "should return an error as the game is not in an 'awaiting' status",
        method: "put",
        data,
        endpoint: `game/${data.games[2]._id}/started`,
        send: {
            loggedInUser 
        },
        expect: {
            statusCode: 400,
            body: {
                status: 400, error: "game-already-started" 
            }
        }
    },
    // -------------------------------------------------------------------------------------------------------------------
    {
        should:
      "should return a successful status. The game should have been initiated.",
        method: "put",
        data,
        endpoint: `game/${game._id}/started`,
        send: {
            loggedInUser 
        },
        expect: {
            statusCode: 201,
            body: {
                success: true 
            }
        }
    },
    {
        should:
      "The number of takeouts created should match the number of players in the game",
        method: "get",
        endpoint: "takeout",
        send: { 
            loggedInUser, 
            query: {
                gameId: game._id 
            } 
        },
        expect: {
            statusCode: 200,
            body: (resBody) => {
                return resBody.length === game.players.length;
            }
        }
    },
    {
        should:
      "The set of chasers should equal the set of targets",
        method: "get",
        endpoint: "takeout",
        send: { 
            loggedInUser, 
            query: {
                gameId: game._id 
            } 
        },
        expect: {
            statusCode: 200,
            body: (resBody) => {
                const chasers = resBody.map(takeout => takeout.chaserId).sort();
                const targets = resBody.map(takeout => takeout.targetId).sort();
                return JSON.stringify(chasers) === JSON.stringify(targets);
            }
        }
    },
    {
        should:
      "The takeouts should all have different takeoutMethods",
        method: "get",
        endpoint: "takeout",
        send: { 
            loggedInUser, 
            query: {
                gameId: game._id 
            } 
        },
        expect: {
            statusCode: 200,
            body: (resBody) => {
                const takeoutMethods =  [ ...new Set(resBody.map(takeout => takeout.takeoutMethodId)) ];
                return takeoutMethods.length === resBody.length;
            }
        }
    },
    {
        should:
      "The game should be inProgress and have a startTime set and in the past",
        method: "get",
        endpoint: `game/${game._id}`,
        send: {
            loggedInUser 
        },
        expect: {
            statusCode: 200,
            body: (resBody) => {
                return resBody.status === "inProgress" && resBody.startTime < Date.now();
            }
        }
    }

    // -------------------------------------------------------------------------------------------------------------------
];
