// todo: need to check createdBy to check whether it's possible to edit this takeoutMethod

module.exports = {
  buildPutTakeoutMethod({ editTakeoutMethod, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { description, themes, difficulty } = httpRequest.body; // expect themes to be an array
      const { _id } = httpRequest.params;
      const loggedIn = getLoggedIn(httpRequest);

      if (!loggedIn) {
        throwError({
          title: "You must be logged in to edit a takeoutMethod.",
          error: "takeoutMethod-not-logged-in",
          status: 403,
        });
      }
      // get takeout method and check loggedIn._id == createdBy (or the user is a superadmin)

      const { modifiedCount } = await editTakeoutMethod({
        _id,
        ...(description ? { description } : {}),
        ...(difficulty ? { difficulty } : {}),
        ...(themes ? { themes } : {}),
      });

      return {
        headers: { "Content-Type": "application/json" },
        status: 201,
        body: { modifiedCount },
      };
    };
  },
};
