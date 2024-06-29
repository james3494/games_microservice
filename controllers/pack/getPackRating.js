
module.exports = {
    buildGetPackRating({ filterRatings }) {
        return async function (httpRequest) {
            const { _id } = httpRequest.params;
  
            const foundRatings = await filterRatings({
                packId: _id 
            });
  
            const average = (ratingType) => {
                const ratings = foundRatings
                    .map((el) => el[ratingType])
                    .filter((el) => el !== undefined)
                    .map((el) => {
                        if (el === true) {
                            return 1;
                        }
                        if (el === false) {
                            return 0;
                        }
                    });
                if (!ratings.length) {
                    return {
                        ratings: 0, average: 0 
                    };
                } else {
                    return {
                        ratings: ratings.length,
                        average: ratings.reduce((a, b) => a + b) / ratings.length
                    };
                }
            };
  
            const body = {
                difficultyRating: average("difficultyRating"),
                funRating: average("funRating"),
                suitabilityRating: average("suitabilityRating"),
                overallRating: average("overallRating"),
                likeIt: average("likeIt")
            };
  
  
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
  