// todo: need to check createdBy to check whether it's possible to edit this hitMethod

module.exports = {
  buildPutHitMethod ({ editHitMethod, catchError, throwError, getLoggedIn }) {
    return async function (httpRequest) {
     try {
       const { description, themes, difficulty } = httpRequest.body; // expect themes to be an array
       const { _id } = httpRequest.params;
       const loggedIn = getLoggedIn(httpRequest);

       if (!loggedIn) {
         throwError("You must be logged in to edit your user.", 403);
       }
       // get hit method and check loggedIn._id == createdBy (or the user is a superadmin)


       const { modifiedCount } = await editHitMethod({
         _id,
         ...(description ? { description } : {}),
         ...(difficulty ? { difficulty } : {}),
         ...(themes ? { themes } : {}),
       });

       return {
         headers: { 'Content-Type': 'application/json' },
         statusCode: 201,
         body: { modifiedCount }
       };
     } catch (e) {
       return catchError(e);
     }
    };
  }
};
