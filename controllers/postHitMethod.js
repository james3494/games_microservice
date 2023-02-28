
module.exports = {
  buildPostHitMethod ({ createHitMethod, catchError, throwError, getLoggedIn }) {
    return async function (httpRequest) {
     try {
       const { ...hitMethodInfo } = httpRequest.body;

       const { _id, groups } = getLoggedIn(httpRequest);
       if (!_id) {
         throwError("You must be logged in to create a hitMethod.", 400);
       }
       if (!groups && !loggedIn.groups?.includes('huntedAdmin') && !loggedIn.groups?.includes('superAdmin')) {
         throwError("You must be an admin to create a hitMethod.", 400);
       }

       const { insertedId } = await createHitMethod({ createdBy: _id, ...hitMethodInfo });

       return {
         headers: { 'Content-Type': 'application/json' },
         statusCode: 201,
         body: { insertedId }
       };
     } catch (e) {
       catchError(e);
     }
    };
  }
};
