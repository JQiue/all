const express = require("express");
const app = express();
const port = 1236;
const Rotuer = require("./router");
const bodyParser = require("body-parser");

app.use((req, res, next) => {
  res.set('X-Powered-By', "all");
  res.set('Server', 'all');
  // res.set("X-Content-Type-Options", "nosniff");
  // res.set("Cache-Control", "max-age=600");
  next();
});
app.use(express.static("./"));
app.use("/space", express.static("../space/build"));
app.use("/probe", express.static("../probe/build"));
app.use("/static/js", express.static('../probe/build/static/js'));
app.use("/static/css", express.static('../probe/build/static/css'));
app.use("/http-test", express.static("../http-test/build"));
app.use(bodyParser.json());
app.use("/api/v1", Rotuer);
app.use(function (req, res) {
  res.send("404 not found");
});

app.listen(port, () => {
  console.log(`The server run at the http://localhost:${port}`);
});
