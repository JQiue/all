const express = require("express");
const multer  = require('multer')
const fs = require("fs");
const path = require("path");

const files = require("../files.json");

// 获取文件列表
const getFiles = (req, res) => {
  res.send(files);
};

const deleteFile = (req, res) => {

};

// 处理上传
const upload = (req, res) => {
  files[req.file.originalname] = req.file;
  fs.writeFileSync(__dirname + "/files.json", JSON.stringify(files));
  res.send('上传成功');
};

// 处理下载
const download = (req, res) => {
  const file = files[req.query.file];
  res.setHeader("Content-Type", file.mimetype);
  res.setHeader("Content-Size", file.size);
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${encodeURI(file.originalname)}`
  );
  res.send(fs.readFileSync(file.path));
};

module.exports = {
  getFiles,
  upload,
  download,
};
