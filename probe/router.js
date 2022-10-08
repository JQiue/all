const express = require("express");
const router = express.Router();
const { get } = require('./controller')

router.use((req, res, next) => {
  res.set("Cache-Control", "max-age=0");
  next();
});
router.get("/get", async (req, res, next) => {
    res.send(await get());
});

module.exports = router;