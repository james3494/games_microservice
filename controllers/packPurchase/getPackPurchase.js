module.exports = {
  buildGetPackPurchase({ filterPackPurchases, throwError, getLoggedIn }) {
    return async function (httpRequest) {
      const { secret, ...filters } = httpRequest.query;
      const { _id } = httpRequest.params;
      const loggedIn = getLoggedIn(httpRequest);

      let filterObj = {};

      if (_id) {
        filterObj = { ...filters, _id };
      } else filterObj = filters;

      const foundPackPurchases = await filterPackPurchases(filterObj);
      const loggedInIsAdmin = loggedIn.admin.takeout || loggedIn.admin.super;

      let body = foundPackPurchases
        .filter((packPurchase) => {
          if (secret && secret === process.env.SECRET) {
            // skip the tests - this comes directly from another microservice
            return true;
          } else {
            // can get a packPurchase if:
            // a) you are an admin
            if (loggedInIsAdmin) return true;

            // b) you own this packPurchase
            if (packPurchase.userId === loggedIn._id) return true;
            return false;
          }
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
