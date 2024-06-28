module.exports = {
  buildGetPackPurchase({ filterPackPurchases, throwError }) {
    return async function (httpRequest) {
      const { ...filters } = httpRequest.query;
      const { _id } = httpRequest.params;
      const loggedIn = httpRequest.user;

      let filterObj = {};

      if (_id) {
        filterObj = { ...filters, _id };
      } else filterObj = filters;

      const foundPackPurchases = await filterPackPurchases(filterObj);
      const loggedInIsAdmin = loggedIn.admin.takeout || loggedIn.admin.super;

      let body = foundPackPurchases
        .filter((packPurchase) => {
          // can get a packPurchase if:
          // a) you are an admin
          if (loggedInIsAdmin) return true;

          // b) you own this packPurchase
          if (packPurchase.userId === loggedIn._id) return true;
          return false;
        })
        .map((packPurchase) => ({
          _id: packPurchase._id,
          packId: packPurchase.packId,
          userId: packPurchase.userId,
          purchasedOn: packPurchase.purchasedOn,
        }));

      if (_id) {
        if (body.length < 1) {
          throwError({
            status: 404,
            title: "packPurchase not found with specified id",
            error: "packPurchase-not-found",
          });
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
