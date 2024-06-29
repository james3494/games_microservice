module.exports = {
    buildPostTakeoutMethod({
        createTakeoutMethod,
        createManyTakeoutMethods,
        throwError
    }) {
        return async function (httpRequest) {
            const loggedIn = httpRequest.user;
            if (!loggedIn._id) {
                throwError({
                    title: "You must be logged in to create a takeoutMethod.",
                    error: "takeoutMethod-not-logged-in",
                    status: 403
                });
            }
            if (!loggedIn.admin.takeout && !loggedIn.admin.super) {
                throwError({
                    title: "You must be an admin to create a takeoutMethod.",
                    error: "takeoutMethod-insufficient-admin",
                    status: 403
                });
            }

            if (Array.isArray(httpRequest.body)) {
                const array = httpRequest.body;
                const { insertedIds } = await createManyTakeoutMethods(
                    array.map((takeoutMethodInfo) => ({
                        createdBy: loggedIn._id,
                        ...takeoutMethodInfo
                    }))
                );

                return {
                    headers: {
                        "Content-Type": "application/json" 
                    },
                    status: 201,
                    body: {
                        insertedIds 
                    }
                };
            } else {
                const { ...takeoutMethodInfo } = httpRequest.body;

                const { insertedId } = await createTakeoutMethod({
                    createdBy: loggedIn._id,
                    ...takeoutMethodInfo
                });

                return {
                    headers: {
                        "Content-Type": "application/json" 
                    },
                    status: 201,
                    body: {
                        insertedId 
                    }
                };
            }
        };
    }
};
