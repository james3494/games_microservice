
module.exports = {
  buildPostGame ({ createGame, catchError, throwError, getLoggedIn }) {
    return async function (httpRequest) {
     try {
       const { ...gameInfo } = httpRequest.body;

       const { _id } = getLoggedIn(httpRequest);
       if (!_id) {
         throwError("You must be logged in to create a game.", 400);
       }

       const { insertedId } = await createGame({ createdBy: _id, ...gameInfo });

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
