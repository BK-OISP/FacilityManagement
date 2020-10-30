const express = require("express");

const facilityController = require("../controller/facility");

const router = express.Router();

router.get("/type", facilityController.getFMType);

router.get(
  "/getallrequest/:employeeId",
  facilityController.getRequestByEmployeeId
);

router.post("/request/add", facilityController.postAddRequestFM);
router.delete("/request/:requestId", facilityController.deleteRequest);

module.exports = router;
