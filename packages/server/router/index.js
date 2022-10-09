const express = require("express");
const router = express.Router();

const Space = require("./space");
const Probe = require("./probe");

router.use("/space", Space);
router.use("/probe", Probe);

module.exports = router;
