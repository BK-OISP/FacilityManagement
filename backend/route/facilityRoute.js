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

//MANAGEMENT
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

//View request
router.put(
  "/manage/view/:requestId",
  checkRole(
    Roles.FM_DEPUTY_HEAD,
    Roles.ACCOUNTANT_LEAD,
    Roles.DIRECTOR,
    Roles.FM_ADMIN_LEAD,
    Roles.FM_FACILITY_TEAM_LEAD
  ),
  facilityController.putSeenRequest
);

router.put(
  "/manage/fmTeamLeadEdit/:requestId",
  checkRole(Roles.FM_FACILITY_TEAM_LEAD),
  facilityController.putFMTeamLeadEditRequest
);

router.put(
  "/manage/fmManage/:requestId",
  checkRole(
    Roles.FM_DEPUTY_HEAD,
    Roles.ACCOUNTANT_LEAD,
    Roles.DIRECTOR,
    Roles.FM_ADMIN_LEAD
  ),
  facilityController.putOtherRoleManageRequest
);

module.exports = router;
