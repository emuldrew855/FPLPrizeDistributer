const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

const fplHost = "https://fantasy.premierleague.com/api/";

app.use(
  cors({
    origin: "*",
  }),
  express.json()
);
let prizeData = {};

app.post("/setUpLeague", (req, res) => {
  console.log("/setUpLeague endpoint hit");
  const { prizes } = req.body;
  prizeData = { prizes };
  res.send("Retrieve League endpoint hit");
});

app.post("/retrieveLeague", (req, res) => {
  console.log("/retrieveLeague endpoint hit");
  const { leagueId } = req.body;
  const config = {
    method: "get",
    url: `${fplHost}leagues-classic/${leagueId}/standings`,
  };
  axios(config)
    .then(function (response) {
      const leagueData = { ...response.data, ...prizeData };
      res.send(JSON.stringify(leagueData));
    })
    .catch(function (error) {
      res.send(error);
    });
});

const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("FPL Web Server at http://%s:%s", host, port);
});
