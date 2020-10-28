const express = require("express");

const facilityController = require("../controller/facility");

const router = express.Router();

router.get("/type", facilityController.getFMType);

router.get("/getallrequest/:employeeId")

router.post("/addrequest", facilityController.postAddRequestFM);

module.exports = router;
