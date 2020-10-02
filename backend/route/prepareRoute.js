const express = require("express");

const prepare = require("../controller/prepare");

const router = express.Router();

router.post("/fmadd", prepare.addFMType);

module.exports = router;
