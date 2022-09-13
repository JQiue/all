const express = require("express");
const router = express.Router();

const Space = require("../space/router");
const Probe = require("../probe/router")

router.use("/space", Space);
router.use("/probe", Probe);

module.exports = router;
