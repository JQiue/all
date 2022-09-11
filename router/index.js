const express = require("express");
const Space = require("../space/router");
const router = express.Router();

router.use("/space", Space);

module.exports = router;
