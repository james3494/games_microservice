module.exports = {
  buildPostPackPurchase({ createPackPurchase, throwError }) {
    return async function (httpRequest) {
      const { ...packPurchaseInfo } = httpRequest.body;

      const loggedIn = httpRequest.user;
      if (!loggedIn._id) {
        throwError({
          title: "You must be logged in to create a packPurchase.",
          error: "packPurchase-not-logged-in",
          status: 403,
        });
      }
      if (
        loggedIn._id !== packPurchaseInfo.userId &&
        !loggedIn.admin.takeout &&
        !loggedIn.admin.super
      ) {
        throwError({
          title:
            "You must be an admin to create a packPurchase for someone else.",
          error: "packPurchase-insufficient-admin",
          status: 403,
        });
      }

      const { insertedId } = await createPackPurchase({
        ...packPurchaseInfo,
      });

      return {
        headers: { "Content-Type": "application/json" },
        status: 201,
        body: { insertedId },
      };
    };
  },
};
