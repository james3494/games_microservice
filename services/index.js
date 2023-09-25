const { takeoutsDb, gamesDb } = require("../dataAccess");

const { makeEditGame } = require("./editGame");
const { makeFilterGames } = require("./filterGames");
const { makeInitiateGame } = require("./initiateGame");
const { makeCreateGame } = require("./createGame");
const { makeRemoveGame } = require("./removeGame");
const { makeJoinGame } = require("./joinGame");
const { makeLeaveGame } = require("./leaveGame");
const { makeCreateTakeout } = require("./createTakeout");
const { makeExecuteTakeout } = require("./executeTakeout");
const { makeEditTakeout } = require("./editTakeout");
const { makeFilterTakeouts } = require("./filterTakeouts");
const { makeRemoveTakeouts } = require("./removeTakeouts");

const throwError = require("errorHandling").buildThrowError({
  logErrors: process.env.LOG_ERRORS,
});

const createTakeout = makeCreateTakeout({ takeoutsDb });
const editTakeout = makeEditTakeout({ takeoutsDb, throwError });
const filterTakeouts = makeFilterTakeouts({ takeoutsDb, throwError });
const removeTakeouts = makeRemoveTakeouts({ takeoutsDb, throwError });

const createGame = makeCreateGame({ gamesDb });
const editGame = makeEditGame({ gamesDb, throwError });
const filterGames = makeFilterGames({ gamesDb, throwError });
const initiateGame = makeInitiateGame({
  gamesDb,
  throwError,
  filterTakeoutMethods,
  createTakeout,
  shuffleArray,
});
const removeGame = makeRemoveGame({
  gamesDb,
  removeTakeouts,
  filterTakeouts,
  throwError,
});
const joinGame = makeJoinGame({ gamesDb, throwError });
const leaveGame = makeLeaveGame({ gamesDb, throwError });

const executeTakeout = makeExecuteTakeout({
  takeoutsDb,
  throwError,
  filterTakeouts,
  createTakeout,
  editTakeout,
  gamesDb,
});

const gamesService = Object.freeze({
  createTakeout,
  editTakeout,
  filterTakeouts,
  createGame,
  editGame,
  initiateGame,
  executeTakeout,
  filterGames,
  removeGame,
  joinGame,
  leaveGame,
});

module.exports = { ...gamesService };

function shuffleArray(array) {
  let b = [...array];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

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
      credentials: "include"
    }
  );
  let body;
  try {
    body = (await response.json()) || body;
    console.log(body)
  } catch (e) {
    body = {};
  }
  if (body.error) throwError(body);

  return body;
}
