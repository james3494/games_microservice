
const data = require(`../data/3.js`);
const loggedInUser = {
  _id: "clm256k9w00003g5xafvyw4ld", // stub
  admin: { super: true },
};
const method = "delete";



module.exports = [
    {
      should: "should return an error about insufficient admin permissions",
      data,
      endpoint: `takeoutMethod/${data.takeoutMethods[0]._id}`,
      method,
      send: {
        loggedInUser: { ...loggedInUser, admin: {} }
      },
      expect: {
        statusCode: 403,
        body: {
          status: 403,
          error: "takeoutMethod-insufficient-admin"
        }
      }
    },
    {
      should: "should return a deletedId",
      data,
      endpoint: `takeoutMethod/${data.takeoutMethods[0]._id}`,
      method,
      send: { loggedInUser },
      expect: {
        statusCode: 200,
        body: { deletedId: data.takeoutMethods[0]._id }
      }
    },
    {
      should: "should return a 404 as the takeoutMethod is not in the data",
      data,
      endpoint: `takeoutMethod/thisidisnotinthedata`,
      method,
      send: { loggedInUser },
      expect: {
        statusCode: 404,
        body: { 
          error: "takeoutMethod-not-found",
          status: 404
        }
      }
    },
  ]


