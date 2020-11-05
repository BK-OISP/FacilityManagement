const express = require("express");

const prepare = require("../controller/prepare");

const router = express.Router();

router.post("/fmadd", prepare.addFMType);

router.post("/addfmbiggroup", prepare.addFMBigGroup);

router.post("/fmunit", prepare.addUnitGroup);

module.exports = router;
