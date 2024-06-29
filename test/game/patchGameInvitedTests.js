const data = require("../data/5.js");
const game = data.games[0];
const method = "patch";

module.exports = [
    {
        should:
      "should return an error for needing to be invited to accept an invitation",
        method,
        data,
        endpoint: `game/${game._id}/join`,
        send: {
            query: {
                user_id: "imnotinvitedtothegame" 
            },
            loggedInUser: {
                _id: "imnotinvitedtothegame" 
            }
        },
        expect: {
            statusCode: 403,
            body: {
                error: "game-invalid-joinLink",
                status: 403
            }
        }
    },
    {
        should:
      "should return an error for needing to be invited to decline an invitation",
        method,
        data,
        endpoint: `game/${game._id}/leave`,
        send: {
            query: {
                user_id: "imnotinvitedtothegame" 
            },
            loggedInUser: {
                _id: "imnotinvitedtothegame" 
            }
        },
        expect: {
            statusCode: 403,
            body: {
                error: "game-invalid-joinLink",
                status: 403
            }
        }
    },
    {
        should:
      "should return an error for not being able to accept an invitation on someone else behalf",
        method,
        data,
        endpoint: `game/${game._id}/join`,
        send: {
            query: {
                user_id: game.invited[0] 
            },
            loggedInUser: {
                _id: "imnotinvitedtothegame" 
            }
        },
        expect: {
            statusCode: 403,
            body: {
                error: "game-insufficient-admin",
                status: 403
            }
        }
    },
    // -------------------------------------------------------------------------------------------------------------------
    {
        should: "should have successfully accepted the invitation",
        method,
        data,
        endpoint: `game/${game._id}/join`,
        send: {
            query: {
                user_id: game.invited[0] 
            },
            loggedInUser: {
                _id: game.invited[0] 
            }
        },
        expect: {
            statusCode: 200
        }
    },
    {
        should:
      "should have the relevant players / invited after the previous test accepted the invitation",
        method: "get",
        endpoint: `game/${game._id}`,
        send: {
            loggedInUser: {
                _id: game.players[0], admin: {
                    takeout: true 
                } 
            }
        },
        expect: {
            statusCode: 200,
            body: {
                players: game.players.concat(game.invited[0]), invited: [] 
            }
        }
    },
    // -------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------------------
    {
        should: "should have successfully declined the invitation",
        method,
        data,
        endpoint: `game/${game._id}/leave`,
        send: {
            query: {
                user_id: game.invited[0] 
            },
            loggedInUser: {
                _id: game.invited[0] 
            }
        },
        expect: {
            statusCode: 200
        }
    },
    {
        should:
      "should have the relevant players / invited after the previous test declined the invitation",
        method: "get",
        endpoint: `game/${game._id}`,
        send: {
            loggedInUser: {
                _id: game.players[0], admin: {
                    takeout: true 
                } 
            }
        },
        expect: {
            statusCode: 200,
            body: {
                players: game.players, invited: [] 
            }
        }
    }
    // -------------------------------------------------------------------------------------------------------------------

];
