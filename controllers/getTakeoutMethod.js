// TODO: add error handling - i.e who can access this?
// which fields to return? 
// send 404 if an _id is posted and not found

module.exports = {
    buildGetTakeoutMethod({ filterTakeoutMethods, throwError, getLoggedIn }) {
      return async function (httpRequest) {
        const { ...filters } = httpRequest.query;
        const { _id } = httpRequest.params;
        const loggedInId = getLoggedIn()._id;

        let filterObj = {};
        if (_id) {
          filterObj = { _id }
        } else filterObj = filters;
  
        const filtered = await filterTakeoutMethods(filterObj);
        let body = filtered.filter(takeoutMethod => takeoutMethod.players.includes(loggedInId)).map(takeoutMethod => ({
          _id: takeoutMethod._id,
        }))
  
        if (_id) {
          body = body[0];
        }
  
  
        return {
          headers: { "Content-Type": "application/json" },
          status: 200,
          body,
        };
      };
    },
  };
  