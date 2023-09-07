module.exports = {
    buildPutTakeoutStatus({ executeTakeout, throwError, getLoggedIn }) {
      return async function (httpRequest) {

        const { _id } = httpRequest.params;
        const loggedIn = getLoggedIn(httpRequest);
  
        if (!loggedIn) {
          throwError({
            title: "You must be logged in to execute a takeout.",
            error: "takeout-not-logged-in",
            status: 403,
          });
        }
  
  
        // get takeout and check the user is the takeoutId
        if (!loggedIn._id !== '' && !loggedIn.admin.super && !loggedIn.admin.takeout) {
          throwError({
            title: "You must be an admin to execute a takeout which you are not the target of.",
            error: "game-insufficient-admin",
            status: 403,
          });
        }
  
        const { success } = await executeTakeout({
          _id
        });
  
        return {
          headers: { "Content-Type": "application/json" },
          status: 200,
          body: { success },
        };
      };
    },
  };
  