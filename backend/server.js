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

app.post("/setupLeague", (req, res) => {
  console.log("Setup league endpoint hit");
  const { leagueId } = req.body;
  const config = {
    method: "get",
    url: `${fplHost}leagues-classic/${leagueId}/standings`,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);
    });
});

const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("FPL Web Server at http://%s:%s", host, port);
});
