const { gamesDb } = require("../../dataAccess");

const { makeEditGame } = require("./editGame");
const { makeFilterGames } = require("./filterGames");
const { makeInitiateGame } = require("./initiateGame");
const { makeCreateGame } = require("./createGame");
const { makeRemoveGame } = require("./removeGame");
const { makeJoinGame } = require("./joinGame");
const { makeLeaveGame } = require("./leaveGame");
const { createTakeout, removeTakeouts, filterTakeouts } = require("../takeout");

const throwError = require("errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});

const createGame = makeCreateGame({ gamesDb });
const editGame = makeEditGame({ gamesDb, throwError });
const filterGames = makeFilterGames({ gamesDb, throwError });
const initiateGame = makeInitiateGame({
  gamesDb,
  throwError,
  filterTakeoutMethods,
  createTakeout,
  filterPackPurchases,
});
const removeGame = makeRemoveGame({
  gamesDb,
  removeTakeouts,
  filterTakeouts,
  throwError,
});
const joinGame = makeJoinGame({ gamesDb, throwError });
const leaveGame = makeLeaveGame({ gamesDb, throwError });

module.exports = {
  createGame,
  editGame,
  initiateGame,
  filterGames,
  removeGame,
  joinGame,
  leaveGame,
};

async function filterTakeoutMethods({ ...filters }) {
  let queryString = "";
  Object.entries(filters).forEach(([key, value], index) => {
    if (typeof value === "object") value = JSON.stringify(value);
    queryString += `${index !== 0 ? `&` : ``}${key}=${value}`;
  });

  const response = await fetch(
    `${process.env.TAKEOUTMETHODS_MICROSERVICE_URL}/takeoutMethod?secret=${process.env.TAKEOUTMETHODS_MICROSERVICE_SECRET}&${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.TAKEOUTMETHODS_MICROSERVICE_API_KEY,
      },
      credentials: "include",
    }
  );
  let body;
  try {
    body = (await response.json()) || body;
    console.log(body);
  } catch (e) {
    body = {};
  }
  if (body.error) throwError(body);

  return body;
}

async function filterPackPurchases({ ...filters }) {
  let queryString = "";
  Object.entries(filters).forEach(([key, value], index) => {
    if (typeof value === "object") value = JSON.stringify(value);
    queryString += `${index !== 0 ? `&` : ``}${key}=${value}`;
  });

  const response = await fetch(
    `${process.env.TAKEOUTMETHODS_MICROSERVICE_URL}/packPurchase?secret=${process.env.TAKEOUTMETHODS_MICROSERVICE_SECRET}&${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.TAKEOUTMETHODS_MICROSERVICE_API_KEY,
      },
      credentials: "include",
    }
  );
  let body;
  try {
    body = (await response.json()) || body;
    console.log(body);
  } catch (e) {
    body = {};
  }
  if (body.error) throwError(body);

  return body;
}
