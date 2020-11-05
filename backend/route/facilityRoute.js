const express = require("express");

const facilityController = require("../controller/facility");

const router = express.Router();

router.get("/type", facilityController.getFMType);

router.get(
  "/getallrequest/:employeeId",
  facilityController.getRequestByEmployeeId
);

//employee request
router.post("/request/add", facilityController.postAddRequestFM);
router.put("/request/:requestId", facilityController.putAddRequestFM);
router.delete("/request/:requestId", facilityController.deleteRequest);

//management

module.exports = router;
