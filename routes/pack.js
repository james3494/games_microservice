const {
    postPack,
    patchPack,
    getPack,
    getPackRating
} = require("../controllers");
  
module.exports = {
    buildPackRoutes: ({ makeExpressCallback, api }) => {
        api.post(
            `${process.env.PATH_ROUTE}/pack`,
            makeExpressCallback(postPack)
        );
        api.patch(
            `${process.env.PATH_ROUTE}/pack/:_id`,
            makeExpressCallback(patchPack)
        );
        api.get(
            `${process.env.PATH_ROUTE}/pack`,
            makeExpressCallback(getPack)
        );
        api.get(
            `${process.env.PATH_ROUTE}/pack/:_id`,
            makeExpressCallback(getPack)
        );
        api.get(
            `${process.env.PATH_ROUTE}/pack/:_id/rating`,
            makeExpressCallback(getPackRating)
        );  
    }
};
  