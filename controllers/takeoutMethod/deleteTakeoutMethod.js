
module.exports = {
    buildDeleteTakeoutMethod ({ removeTakeoutMethod, throwError }) {
        return async function (httpRequest) {
            const { _id } = httpRequest.params;
            const loggedIn = httpRequest.user;

            if (!loggedIn.admin?.super) {
                throwError({
                    title: "You must be a superadmin to delete takeoutMethods.", 
                    error: "takeoutMethod-insufficient-admin", 
                    status: 403
                });
            }
            const { deletedId } = await removeTakeoutMethod({
                _id 
            });
        
            return {
                headers: {
                    "Content-Type": "application/json" 
                },
                status: 200,
                body: {
                    deletedId 
                }
            };
        };
    }
};
  