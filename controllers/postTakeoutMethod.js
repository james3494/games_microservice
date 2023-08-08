
module.exports = {
  buildPostTakeoutMethod ({ createTakeoutMethod, catchError, throwError, getLoggedIn }) {
    return async function (httpRequest) {
     try {
       const { ...takeoutMethodInfo } = httpRequest.body;

       const { _id, groups } = getLoggedIn(httpRequest);
       if (!_id) {
         throwError("You must be logged in to create a takeoutMethod.", 400);
       }
       if (!groups && !loggedIn.groups?.includes('huntedAdmin') && !loggedIn.groups?.includes('superAdmin')) {
         throwError("You must be an admin to create a takeoutMethod.", 400);
       }

       const { insertedId } = await createTakeoutMethod({ createdBy: _id, ...takeoutMethodInfo });

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
