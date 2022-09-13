const express = require("express");
const router = express.Router();

const { get } = require('./controller')

router.get("/get", async (req, res, next) => {
    res.send(await get());
});

module.exports = router;