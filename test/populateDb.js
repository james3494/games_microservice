/*
Populates test database. There are a few options:

a) a number. this corresponds to a file in the ./data folder
b) an object with collection keys. This corresponds to direct data (similar to what is in the ./data files)
c) falsy - implies the data populated doesn't matter - this will do nothing. 
Similarly, if a particular database is blank it implies the data doesn't matter.


*/

const { takeoutMethodsDb, takeoutsDb, gamesDb, packsDb, ratingsDb, packPurchasesDb } = require("../dataAccess");


module.exports = async (data) => {
    if (!data) {
        return;
    }
    if (typeof data === "number") {
        data = require(`./data/${data}.js`);
    }
    
    if (typeof data !== "object") {
        throw Error("invalid test data structure");
    }

    if (data.games) {
        await gamesDb.removeAll();
        if (data.games.length) {
            await gamesDb.insertMany(data.games);
        }
    }

    if (data.takeouts) {
        await takeoutsDb.removeAll();
        if (data.takeouts.length) {
            await takeoutsDb.insertMany(data.takeouts);
        }
    }

    if (data.takeoutMethods) {
        await takeoutMethodsDb.removeAll();
        if (data.takeoutMethods.length) {
            await takeoutMethodsDb.insertMany(data.takeoutMethods);
        }
    }

    if (data.packs) {
        await packsDb.removeAll();
        if (data.packs.length) {
            await packsDb.insertMany(data.packs);
        }
    }
    if (data.packPurchases) {
        await packPurchasesDb.removeAll();
        if (data.packPurchases.length) {
            await packPurchasesDb.insertMany(data.packPurchases);
        }
    }
    if (data.ratings) {
        await ratingsDb.removeAll();
        if (data.ratings.length) {
            await ratingsDb.insertMany(data.ratings);
        }
    }

};