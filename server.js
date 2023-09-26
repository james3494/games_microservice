require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const api = require ('./routes');


// check api key
app.use((req, res, next) => {
  const apiKey = req.get("X-Api-Key");
  if (!apiKey || apiKey !== process.env.API_KEY) {
    res.status(403).send({
      status: 403,
      title: "Invalid API key",
      error: "games-microservice-invalid-api-key",
      detail: "Microservices can only be accessed via the API gateway."
    });
  } else next();
});

// all of the routes are implemented here
app.use(api);

// the path wasn't found
app.use((req, res) => res.status(404).send({
  status: 404,
  title: `Path not found`,
  error: "games-microservice-path-not-found",
  detail: `The path ${req.originalUrl} does not exist on this microservice`
}));

const server = app.listen(port, () => {
  console.log(`games microservice listening on port ${port}`);
});

module.exports = { server, app };

