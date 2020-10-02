const express = require("express");

const facilityController = require("../controller/facility");

const router = express.Router();

router.get("/type", facilityController.getFMType);

module.exports = router;
