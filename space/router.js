const express = require("express");
const router = express.Router();
const { download } = require("./controller");
const fs = require("fs");
const multer = require("multer");
const upload = multer({
  dest: "./space/files",
  fileFilter(req, file, callback) { 
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    callback(null, true)
  }
});

const files = require("./files.json");

router.post("/upload", upload.single("file"), (req, res, next) => {
  console.log(files)
  files[req.file.originalname] = req.file;
  fs.writeFileSync(__dirname + "/files.json", JSON.stringify(files));
  next();
});

router.get("/files", (req, res, next) => {
  res.send(files);
});

router.get("/download", (req, res, next) => {
  const file = files[req.query.file];
  res.setHeader("Content-Type", file.mimetype);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${encodeURI(file.originalname)}`
  );
  res.send(fs.readFileSync(file.path));
});

module.exports = router;
