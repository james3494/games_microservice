module.exports = {
    buildGetRating({ filterRatings, throwError }) {
        return async function (httpRequest) {
            const { ...filters } = httpRequest.query;
            const { _id } = httpRequest.params;
            const loggedIn = httpRequest.user;

            let filterObj = {};
  
            if (_id) {
                filterObj = {
                    ...filters, _id 
                };
            } else {
                filterObj = filters;
            }
  
            const foundRatings = await filterRatings(filterObj);
            const loggedInIsAdmin = loggedIn.admin.takeout || loggedIn.admin.super;
  
            let body = foundRatings
                .filter((game) => {
                    // can get a rating if:
                    // a) you are an admin
                    if (loggedInIsAdmin) {
                        return true;
                    }
  
                    // b) you created this rating
                    if (foundRatings.createdBy === loggedIn._id) {
                        return true;
                    }
                    return false;
                })
                .map((rating) => ({
                    _id: rating._id,
                    takeoutMethodId: rating.takeoutMethodId,
                    packId: rating.packId,
                    takeoutId: rating.takeoutId,
                    likeIt: rating.likeIt,
                    difficultyRating: rating.difficultyRating,
                    funRating: rating.funRating,
                    suitabilityRating: rating.suitabilityRating,
                    overallRating: rating.overallRating,
                    additionalComments: rating.additionalComments
                }));
  
            if (_id) {
                if (body.length < 1) {
                    throwError({
                        status: 404,
                        title: "rating not found with specified id",
                        error: "rating-not-found"
                    });
                }
                body = body[0];
            }
  
            return {
                headers: {
                    "Content-Type": "application/json" 
                },
                status: 200,
                body
            };
        };
    }
};