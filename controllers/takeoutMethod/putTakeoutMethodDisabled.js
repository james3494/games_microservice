
module.exports = {
    buildPutTakeoutMethodDisabled({ editTakeoutMethod, throwError, getLoggedIn }) {
      return async function (httpRequest) {
        const { disabled } = httpRequest.body; 
        const { _id } = httpRequest.params;
        const loggedIn = getLoggedIn(httpRequest);
  
        if (!loggedIn) {
          throwError({
            title: "You must be logged in to edit a takeoutMethod.",
            error: "takeoutMethod-not-logged-in",
            status: 403,
          });
        }
        if (
          !loggedIn.admin.takeout &&
          !loggedIn.admin.super
        ) {
          throwError({
            title: "You must be an admin to edit a takeoutMethod.",
            error: "takeoutMethod-insufficient-admin",
            status: 403,
          });
        }
  
        const { modifiedCount } = await editTakeoutMethod({
          _id,
          ...(disabled !== undefined ? { disabled } : {}),
        });
  
        return {
          headers: { "Content-Type": "application/json" },
          status: 201,
          body: { modifiedCount },
        };
      };
    },
  };
  