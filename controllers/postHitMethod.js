
module.exports = {
  buildPostHitMethod ({ addHitMethod, catchError }) {
    return async function (httpRequest) {
     try {
       const { ...hitMethodInfo } = httpRequest.body;
       const insertedId = await addHitMethod({ ...hitMethodInfo });

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
