const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/getLeague", function (_req, res) {
  const config = {
    method: "get",
    url: "https://fantasy.premierleague.com/api/leagues-classic/838035/standings",
    headers: {},
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
