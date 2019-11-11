// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

app.get("/api/timestamp/:time", (req, res) => {
  const timeStr = req.params.time;
  if (/\d{5,}/.test(timeStr)) {
    const dateInt = parseInt(timeStr);
    //Date regards numbers as unix timestamps, strings are processed differently
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
    return;
  }
  const date = timeStr ? new Date(timeStr) : new Date();
  const isValidDate = date instanceof Date && !isNaN(date);
  console.log(date);

  if (isValidDate) {
    res.json({ unix: date.valueOf(), utc: date.toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

app.get("/api/timestamp", (req, res) => {
  const date = new Date();
  const isValidDate = date instanceof Date && !isNaN(date);
  if (isValidDate) {
    res.json({ unix: date.valueOf(), utc: date.toUTCString() });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
