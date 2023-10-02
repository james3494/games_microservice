
module.exports = {
    buildPostRating({ createRating, filterTakeouts, throwError, getLoggedIn }) {
      return async function (httpRequest) {
        const { ...ratingInfo } = httpRequest.body;
  
        const loggedIn = getLoggedIn(httpRequest);
        if (!loggedIn._id) {
          throwError({
            title: "You must be logged in to create a rating.",
            error: "rating-not-logged-in",
            status: 403,
          });
        }
        const isChaser = (
          await filterTakeouts({ _id: rating.takeoutId })
        )[0].chaserId === loggedIn._id;
        if (!isChaser) {
          throwError({
            title: "You must be the chaser to create a rating for a takeoutMethod.",
            error: "rating-not-chaser",
            status: 403,
          });
        }


        const { insertedId } = await createRating({
          createdBy: loggedIn._id,
          ...ratingInfo,
        });
  
        return {
          headers: { "Content-Type": "application/json" },
          status: 201,
          body: { insertedId },
        };
      };
    },
  };
  