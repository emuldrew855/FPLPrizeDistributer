const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql2");
const app = express();

const fplHost = "https://fantasy.premierleague.com/api/";
let prizeData,
  user = {};

app.use(
  cors({
    origin: "*",
  }),
  express.json()
);
const connection = mysql.createConnection(
  "mysql://root:mysqlpw@localhost:55000/FPL"
);

app.get("/", (_req, res) => {
  res.send("FPL prize distribution server");
});

app.post("/addUser", (req, res) => {
  console.log("/addUser endpoint hit");
  user = req.body;
  console.log(`User: ${JSON.stringify(user)}`);
  res.send("/addUser endpoint hit");
});

app.get("/getUser", (_req, res) => {
  console.log("/getUser endpoint hit");

  res.send(JSON.stringify(user));
});

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
      const leagueName = response.data.league.name;
      console.log(`League Name: ${leagueName}`);
      const leagueData = { ...response.data, ...prizeData };
      console.log(`League Data: ${JSON.stringify(leagueData)}`);
      // connection.connect();
      // connection.query(
      //   `INSERT INTO \`league\` (\`id\`, \`name\`) VALUES ('${leagueId}', '${leagueName}');`,
      //   function (error, results) {
      //     if (error) console.log(error);
      //     console.log(`DB Results ${JSON.stringify(results)}`);
      //   }
      // );
      res.send(JSON.stringify(leagueData));
    })
    .catch(function (error) {
      res.send(error);
    });
});

const server = app.listen(8081, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("FPL Web Server at http://%s:%s", host, port);
});

module.exports = server;
