module.exports = {
    buildPostPack({ createPack, throwError, getLoggedIn }) {
      return async function (httpRequest) {
        const { ...packInfo } = httpRequest.body;
  
        const loggedIn= getLoggedIn(httpRequest);
        if (!loggedIn._id) {
          throwError({
            title: "You must be logged in to create a pack.",
            error: "pack-not-logged-in",
            status: 403,
          });
        }
        if (
          !loggedIn.admin.takeout &&
          !loggedIn.admin.super
        ) {
          throwError({
            title: "You must be an admin to create a pack.",
            error: "pack-insufficient-admin",
            status: 403,
          });
        }
  
        const { insertedId } = await createPack({
          createdBy: loggedIn._id,
          ...packInfo,
        });
  
        return {
          headers: { "Content-Type": "application/json" },
          status: 201,
          body: { insertedId },
        };
      };
    },
  };
  