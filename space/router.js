const express = require("express");
const router = express.Router();
const { download } = require("./controller");

const multer = require("multer");
const uplaod = multer({ dest: "./space/files" });
const files = require("./files.json");
const fs = require("fs");

router.post("/upload", uplaod.single("file"), (req, res, next) => {
  console.log(req.file);
  console.log(files);
  files[req.file.originalname] = req.file;
  fs.writeFileSync(__dirname + "/files.json", JSON.stringify(files));
  next();
});

router.get("/files", (req, res, next) => {
  res.send(files);
});

router.get("/download", (req, res, next) => {
  console.log(req.query);
  const file = files[req.query.file];
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader(
    "Content-Disposition",
    `attachment;filename=${file.originalname}`
  );
  res.send(fs.readFileSync(file.path));
});

module.exports = router;
