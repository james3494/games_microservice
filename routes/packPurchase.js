const {
    postPackPurchase,
    getPackPurchase
} = require("../controllers");
  
module.exports = {
    buildPackPurchaseRoutes: ({ makeExpressCallback, api }) => {
        api.post(
            `${process.env.PATH_ROUTE}/packPurchase`,
            makeExpressCallback(postPackPurchase)
        );
        api.get(
            `${process.env.PATH_ROUTE}/packPurchase`,
            makeExpressCallback(getPackPurchase)
        );
        api.get(
            `${process.env.PATH_ROUTE}/packPurchase/:_id`,
            makeExpressCallback(getPackPurchase)
        );
    }
};
  