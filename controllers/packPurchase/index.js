const { createPackPurchase, filterPackPurchases, filterTakeoutMethods } = require("../../services");

const { buildPostPackPurchase } = require("./postPackPurchase");
const { buildGetPackPurchase } = require("./getPackPurchase");

module.exports = ({ throwError, getLoggedIn }) => {
  const postPackPurchase = buildPostPackPurchase({
    createPackPurchase,
    throwError,
    getLoggedIn,
  });

  const getPackPurchase = buildGetPackPurchase({
    filterPackPurchases,
    throwError,
    getLoggedIn,
    filterTakeoutMethods,
  });

  return {
    postPackPurchase,
    getPackPurchase,
  };
};
