// TODO: anything to prevent peple just getting takeout methods? they have to be accessible 
// maybe make this only accessible to admins and then behind the scenes the takeoutMethod text is added to the takeout

module.exports = {
    buildGetTakeoutMethod({ filterTakeoutMethods, throwError }) {
      return async function (httpRequest) {
        const { ...filters } = httpRequest.query;
        const { _id } = httpRequest.params;

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
  