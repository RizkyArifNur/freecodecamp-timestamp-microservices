// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const urlDb = require("./url-db");
const dns = require("dns");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post("/api/shorturl/new", (req, res) => {
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;
  const protocolRegExp = /^https?:\/\/(.*)/i;
  let newUrl = req.body.url;
  if (newUrl.match(/\/$/i)) {
    newUrl = newUrl.slice(0, -1);
  }
  if (!urlRegex.test(newUrl)) {
    return res.json({ error: "invalid URL" });
  }

  const protocolMatch = newUrl.match(protocolRegExp);
  if (!protocolMatch) {
    return res.json({ error: "invalid URL" });
  }

  dns.lookup(protocolMatch[1], err => {
    if (err) {
      return res.json({ error: "invalid Hostname" });
    }
    const insertedUrl = urlDb.insert(newUrl);
    res.json({ original_url: newUrl, short_url: insertedUrl.id });
  });
});

app.get("/api/shorturl/:id", (req, res) => {
  console.log(req.params.id);

  const originalUrl = urlDb.findById(req.params.id);
  console.log(originalUrl);

  if (!originalUrl) {
    return res.json({ error: "invalid Id" });
  }

  res.redirect(originalUrl.url);
});

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
