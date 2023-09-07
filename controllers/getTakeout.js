// TODO: add error handling - i.e who can access this?

module.exports = {
    buildGetTakeout({ filterTakeouts, throwError }) {
      return async function (httpRequest) {
        const { ...filters } = httpRequest.query;
        const { _id } = httpRequest.params;

        let filterObj = {};
        if (_id) {
          filterObj = { _id }
        } else filterObj = filters;

        const filtered = await filterTakeouts(filterObj);
        let body = filtered.map(takeout => ({
          _id: takeout._id,
          gameId: takeout.gameId,
          chaserId: takeout.chaserId,
          targetId: takeout.targetId,
          takeoutMethodId: takeout.takeoutMethodId,
          status: takeout.status,
          completedAt: takeout.completedAt
        }))
  
        if (_id) {
          if (body.length < 1) {
            throwError({
              status: 404,
              title: "takeout not found with specified id",
              error: "takeout-not-found"
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
  