const data = require("../data/1.js");
const loggedInUser = {
    _id: data.games[1].admins[0] 
};
const method = "delete";

module.exports = [
    {
        should: "should return an error about insufficient admin permissions",
        data,
        endpoint: `game/${data.games[1]._id}`,
        method,
        send: {
            loggedInUser: {
                _id: "thisisthewrongid" 
            }
        },
        expect: {
            statusCode: 403,
            body: {
                status: 403,
                error: "game-insufficient-admin"
            }
        }
    },
    {
        should: "should return an error about the game not being in awaiting status",
        data,
        endpoint: `game/${data.games[0]._id}`,
        method,
        send: {
            loggedInUser 
        },
        expect: {
            statusCode: 400,
            body: {
                status: 400,
                error: "game-already-started"
            }
        }
    },
    {
        should: "should return a deletedId",
        data,
        endpoint: `game/${data.games[1]._id}`,
        method,
        send: {
            loggedInUser 
        },
        expect: {
            statusCode: 200,
            body: {
                deletedId: data.games[1]._id 
            }
        }
    },
    {
        should: "should return a 404 as the game is not in the data",
        data,
        endpoint: "game/thisidisnotinthedata",
        method,
        send: {
            loggedInUser 
        },
        expect: {
            statusCode: 404,
            body: {
                error: "game-not-found",
                status: 404
            }
        }
    }
];
