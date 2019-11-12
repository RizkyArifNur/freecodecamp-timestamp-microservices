// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.get("/api/whoami", (req, res) => {
  var ipaddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  var language = req.headers["accept-language"];
  var software = req.headers["user-agent"];
  res.json({
    ipaddress,
    language,
    software
  });
});
app.get("/api/timestamp/:time?", (req, res) => {
  var date = null;
  if (req.params.time !== undefined) {
    var unixTimestamp = parseInt(req.params.time * 1);
    if (isNaN(unixTimestamp)) {
      date = new Date(req.params.time);
    } else {
      date = new Date(unixTimestamp);
    }
  } else {
    date = new Date(Date.now());
  }

  var response =
    date == "Invalid Date"
      ? { error: "Invalid Date" }
      : { unix: date.getTime(), utc: date.toUTCString() };

  res.json(response);
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
