const express = require("express");
const multer  = require('multer')

const uplaod = multer({dest: 'files/'})
const fs = require("fs");
const path = require("path");
const root = path.normalize(path.resolve(__dirname));
const temp = path.resolve(root, "temps");
const uploadPath = path.resolve(root, "files");

// 获取文件列表
const getFiles = (req, res) => {
  res.send('获取文件列表')
  return;
  fs.readdir(uploadPath, (err, files) => {
    res.writeHead(200, {
      "Content-Type": "application/json;charset=utf-8",
    });
    const result = files.map((file) => {
      return {
        file,
        createtime: fs.statSync(uploadPath + "/" + file).ctime.toLocaleString(),
      };
    });
    console.log(result);
    res.end(
      JSON.stringify({
        code: 200,
        msg: "获取文件列表成功",
        files: result,
      })
    );
  });
};

// 将临时文件移动到指定目录
function move(oldPath, newPath) {
  fs.rename(oldPath, newPath, (err) => {
    if (err) throw err;
    console.log("上传成功");
  });
}

// 处理上传
const upload = (req, res) => {
  uplaod.single('file')
  res.send('上传')
  return;
  const form = formidable({
    multiples: true,
  });
  form.uploadDir = temp;
  if (!(fs.existsSync(temp) && fs.existsSync(uploadPath))) {
    fs.mkdirSync(uploadPath);
    fs.mkdirSync(temp);
  }
  console.log(root, form.uploadDir);
  form.parse(req, (err, fields, files) => {
    console.log(files);
    if (Array.isArray(files.upload)) {
      files.upload.forEach((file) => {
        move(file.filepath, path.resolve(uploadPath, file.originalFilename));
      });
    } else {
      move(
        files.upload.filepath,
        path.resolve(uploadPath, files.upload.originalFilename)
      );
    }
    res.writeHead(200, {
      "Content-Type": "application/json;charset=utf-8",
    });
    res.end(
      JSON.stringify({
        code: 200,
        msg: "上传成功",
      })
    );
  });
};

// 处理下载
const download = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
  });
  res.end(
    fs.readFileSync(`./files/${decodeURI(req.url.split("/download/")[1])}`)
  );
};

module.exports = {
  getFiles,
  upload,
  download,
};
