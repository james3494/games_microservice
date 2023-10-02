// check this user was the chaser for the takeout

module.exports = {
    buildPostRating({ createRating, throwError, getLoggedIn }) {
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
  