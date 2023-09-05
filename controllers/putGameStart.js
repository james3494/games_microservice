module.exports = {
    buildPutGameStart({ initiateGame, throwError, getLoggedIn }) {
      return async function (httpRequest) {

        const { _id } = httpRequest.params;
        const loggedIn = getLoggedIn(httpRequest);
  
        if (!loggedIn) {
          throwError({
            title: "You must be logged in to initiate a game.",
            error: "game-not-logged-in",
            status: 403,
          });
        }
  
  
        // get game and check loggedIn._id is in game admins (or the user is a superadmin)
        if (!loggedIn._id !== '' && !loggedIn.admin.super && !loggedIn.admin.takeout) {
          throwError({
            title: "You must be an admin to initiate a game.",
            error: "game-insufficient-admin",
            status: 403,
          });
        }
  
        const { modifiedCount } = await initiateGame({
          _id
        });
  
        return {
          headers: { "Content-Type": "application/json" },
          status: 201,
          body: { modifiedCount, success: modifiedCount == 1 },
        };
      };
    },
  };
  