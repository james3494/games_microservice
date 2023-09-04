
module.exports = {
    buildDeleteGame ({ removeGame, getLoggedIn, throwError }) {
      return async function (httpRequest) {
        const { _id } = httpRequest.params;
        const loggedIn = getLoggedIn(httpRequest);

        if (!loggedIn.admin?.super) {
          throwError({
            title: "You must be a superadmin to delete games.", 
            error: "game-insufficient-admin", 
            status: 403
          });
        }
        const { deletedId } = await removeGame({ _id });
        
        return {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
          body: { deletedId }
        };
      };
    }
  };
  