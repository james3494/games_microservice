const { createPackPurchase, filterPackPurchases, filterTakeoutMethods } = require("../../services");

const { buildPostPackPurchase } = require("./postPackPurchase");
const { buildGetPackPurchase } = require("./getPackPurchase");

module.exports = ({ throwError }) => {
  const postPackPurchase = buildPostPackPurchase({
    createPackPurchase,
    throwError,
  });

  const getPackPurchase = buildGetPackPurchase({
    filterPackPurchases,
    throwError,
    filterTakeoutMethods,
  });

  return {
    postPackPurchase,
    getPackPurchase,
  };
};
