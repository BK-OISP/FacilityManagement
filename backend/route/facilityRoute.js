const express = require("express");

const Roles = require("../helper/role");
const checkRole = require("../middleware/checkRole");
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

router.get(
  "/manage/all/:employeeId",
  checkRole(
    Roles.FM_DEPUTY_HEAD,
    Roles.ACCOUNTANT_LEAD,
    Roles.DIRECTOR,
    Roles.FM_ADMIN_LEAD,
    Roles.FM_FACILITY_TEAM_LEAD
  ),
  facilityController.getAllRequest
);

module.exports = router;
