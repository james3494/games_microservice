const throwError = require("../errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});


module.exports = {
  ...require("./game")({ throwError }),
  ...require("./takeout")({ throwError }),
  ...require("./pack")({ throwError }),
  ...require("./packPurchase")({ throwError }),
  ...require("./rating")({ throwError }),
  ...require("./takeoutMethod")({ throwError }),
};
