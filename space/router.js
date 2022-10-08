const express = require("express");
const router = express.Router();
const { download, getFiles } = require("./controller");
const fs = require("fs");
const multer = require("multer");

const upload = multer({
  dest: "./space/files",
  fileFilter(req, file, callback) { 
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    callback(null, true)
  }
});

router.post("/upload", upload.single("file"), (req, res, next) => {
  upload(req, res);
});

router.get("/files", (req, res, next) => {
  getFiles(req, res);
});

router.get("/download", (req, res, next) => {
  download(req, res);
});

module.exports = router;
