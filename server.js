// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

app.get("/api/:time", (req, res) => {
  const timeStr = req.params.time;
  const date = timeStr ? new Date(timeStr) : new Date();
  const isValidDate = date instanceof Date && !isNaN(date);
  console.log(date);

  if (isValidDate) {
    res.send({ unix: date.getTime(), utc: date.toUTCString() });
  } else {
    res.send({ error: "Invalid Date" });
  }
});

app.get("/api/", (req, res) => {
  const date = new Date();
  const isValidDate = date instanceof Date && !isNaN(date);
  if (isValidDate) {
    res.send({ unix: date.getTime(), utc: date.toUTCString() });
  } else {
    res.send({ error: "Invalid Date" });
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
