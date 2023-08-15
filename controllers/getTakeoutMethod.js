// TODO: add error handling - i.e who can access this?
// which fields to return? 

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
        let body = filtered.map(takeoutMethod => ({
          _id: takeoutMethod._id,
          description: takeoutMethod.description,
          difficulty: takeoutMethod.difficulty,
          themes: takeoutMethod.themes,
        }))
  
        if (_id) {
          if (body.length < 1) {
            throwError({
              status: 404,
              title: "TakeoutMethod not found with specified id",
              error: "takeoutMethod-not-found"
            })
          }
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
  