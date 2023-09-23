module.exports = {
  buildPatchGameInvited({
    acceptGameInvitation,
    declineGameInvitation,
    throwError,
    getLoggedIn,
  }) {
    return async function (httpRequest) {
      const { _id, user_id } = httpRequest.params;
      const { accept } = httpRequest.body;
      const loggedIn = getLoggedIn(httpRequest);

      if (!loggedIn) {
        throwError({
          title: "You must be logged in to edit a games invitees.",
          error: "game-not-logged-in",
          status: 403,
        });
      }

      if (
        loggedIn._id !== user_id &&
        !loggedIn.admin.takeout &&
        !loggedIn.admin.super
      ) {
        throwError({
          title:
            "You must be an admin to accept invitations on behalf of others.",
          error: "game-insufficient-admin",
          status: 403,
        });
      }

      const functionToUse = accept ? acceptGameInvitation : declineGameInvitation
      const { modifiedCount } = await functionToUse({ _id, user_id });

      if (modifiedCount !== 1) {
        throwError({
          title: "There was an unknown error responding to the invitation.",
          error: "game-unknown-error",
          status: 400,
        });
      }

      return {
        headers: { "Content-Type": "application/json" },
        status: 200,
      };
    };
  },
};
