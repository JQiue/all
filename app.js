const express = require("express");
const app = express();
const port = 1236;
const Rotuer = require("./router");
const bodyParser = require("body-parser");

app.use((req, res, next) => {
  res.set('X-Powered-By', "all");
  res.set('Server', 'all');
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Cache-Control", "max-age=600");
  next();
});
app.use(express.static("./"));
app.use(express.static("./space"));
app.use(express.static("./probe"));
app.use(express.static("./http-test"));
app.use(bodyParser.json());
app.use("/api/v1", Rotuer);
app.use(function (req, res) {
  res.send("404 not found");
});

app.listen(port, () => {
  console.log(`The server run at the http://localhost:${port}`);
});
