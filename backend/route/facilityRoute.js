const express = require("express");

const addRequestFMUpload = require("../middleware/addRequestMiddleware");

const facilityController = require("../controller/facility");

const router = express.Router();

router.get("/type", facilityController.getFMType);

router.post(
  "/addrequest",
  addRequestFMUpload.array("imgCollection"),
  facilityController.postAddRequestFM
);

module.exports = router;
