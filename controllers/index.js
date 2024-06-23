const throwError = require("../errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});

const getLoggedIn = (httpRequest) => {
  try {
    let loggedIn = JSON.parse(httpRequest.headers["X-Current-User"]) || {};
    // if no _id the user is not logged in
    if (!loggedIn._id) return null;
    if (!loggedIn.admin) loggedIn.admin = {};
    return loggedIn;
  } catch (err) {
    throwError({
      title: "invalid user header passed",
      status: 500,
      error: "auth-invalid-user-header",
      detail:
        "A stringified object should be passed by the gateway to the microservice in a X-Current-User header",
    });
  }
};

module.exports = {
  ...require("./game")({ throwError, getLoggedIn }),
  ...require("./takeout")({ throwError, getLoggedIn }),
  ...require("./pack")({ throwError, getLoggedIn }),
  ...require("./packPurchase")({ throwError, getLoggedIn }),
  ...require("./rating")({ throwError, getLoggedIn }),
  ...require("./takeoutMethod")({ throwError, getLoggedIn }),
};
