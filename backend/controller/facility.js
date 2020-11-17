const addRequestMiddleware = require("../middleware/addRequestMiddleware");

const FM_Type = require("../model/fm-Type");
const HttpError = require("../model/http-error");
const FM_BigGroup = require("../model/fm-BigGroup");
const FM_Reuqest = require("../model/fm-Request");
const FM_Unit = require("../model/fm-Unit");
const Roles = require("../helper/role");

const HEAD_ROLE = [
  Roles.FM_FACILITY_TEAM_LEAD,
  Roles.FM_DEPUTY_HEAD,
  Roles.FM_ADMIN_LEAD,
  Roles.DIRECTOR,
  Roles.ACCOUNTANT_LEAD,
];

const getCurrentRole = (userRole) => {
  for (const role of userRole) {
    if (HEAD_ROLE.includes(role)) {
      return role;
    }
  }
};

const getCurrentRoleKey = (role) => {
  switch (role) {
    case Roles.FM_DEPUTY_HEAD:
      return "isDeputyHeadApproval";
    case Roles.FM_FACILITY_TEAM_LEAD:
      return "isFMTeamLeadApproval";
    case Roles.FM_ADMIN_LEAD:
      return "isAccountLeadApproval";
    case Roles.ACCOUNTANT_LEAD:
      return "isAdminLeadApproval";
    case Roles.DIRECTOR:
      return "isDirectorApproval";
    default:
      break;
  }
};

//employee request
const getFMType = async (req, res, next) => {
  try {
    const allType = await FM_BigGroup.find({});
    const unitType = await FM_Unit.find();
    return res.json({ allType, unitType });
  } catch (error) {
    return next(new HttpError("Can't find all FM Types", 500));
  }
};

const postAddRequestFM = async (req, res, next) => {
  try {
    let imgCollection = [];
    await addRequestMiddleware(req, res);
    const facilityRequest = JSON.parse(req.body.facilityRequest);
    const findFmBigGroup = await FM_BigGroup.findOne({
      value: facilityRequest.fmBigGroup,
    });
    const findUnit = await FM_Unit.findOne({
      label: facilityRequest.unit,
    });

    if (!findFmBigGroup || !findUnit) return next(new HttpError("Erorr!", 501));

    if (req.files && req.files.length > 0) {
      imgCollection = req.files.map((item) => item.path);
    }

    const convertRequest = {
      ...facilityRequest,
      fmBigGroup: findFmBigGroup._id,
      imgCollection: imgCollection,
      employeeId: req.userId,
      unit: findUnit._id,
      // fmType: facilityRequest.fmType !== "" ? facilityRequest.fmType : null,
    };

    const saveRequest = new FM_Reuqest(convertRequest);
    await saveRequest.save();

    return res.json({ mess: "ok" });
  } catch (error) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res
        .status(406)
        .json({ message: "Exceeds the number of files allowed to upload" });
    }
    return next(new HttpError("Something went wrong", 501));
  }
};

const putAddRequestFM = async (req, res, next) => {
  let imgCollection = [];
  try {
    await addRequestMiddleware(req, res);

    const { requestId } = req.params;
    const facilityRequest = JSON.parse(req.body.facilityRequest);

    const findFmBigGroup = await FM_BigGroup.findOne({
      label: facilityRequest.fmBigGroup,
    });

    const findUnit = await FM_Unit.findOne({
      label: facilityRequest.unit,
    });

    if (!findFmBigGroup || !findUnit) return next(new HttpError("Erorr!", 501));

    if (req.files && req.files.length > 0) {
      imgCollection = req.files.map((item) => item.path);
    }

    const convertRequest = {
      ...facilityRequest,
      imgCollection: imgCollection,
      fmBigGroup: findFmBigGroup._id,
      unit: findUnit._id,
    };

    if (imgCollection.length === 0) {
      delete convertRequest.imgCollection;
    }

    const doc = await FM_Reuqest.findOneAndUpdate(
      {
        _id: requestId,
        employeeId: req.userId,
        "status.overallStatus": true,
        "status.isDeputyHeadApproval": false,
        "status.isFMTeamLeadApproval": false,
        "status.isAdminLeadApproval": false,
        "status.isAccountLeadApproval": false,
        "status.isDirectorApproval": false,
      },
      convertRequest
    );

    if (!doc) return next(new HttpError("Error"));
    return res.json({ message: "ok" });
  } catch (error) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return next(
        new HttpError("Exceeds the number of files allowed to upload", 406)
      );
    }
    return next(new HttpError("Something went wrong"));
  }
};

const getRequestByEmployeeId = async (req, res, next) => {
  const { employeeId } = req.params;

  if (req.userId === employeeId) {
    try {
      const allRequest = await FM_Reuqest.find({
        employeeId: employeeId,
        isDelete: false,
      })
        .populate(["fmBigGroup", "unit"])
        .sort({ updatedAt: -1 });

      return res.json({ allRequest });
    } catch (error) {
      return next(
        new HttpError("Can't get all request. Please try again!", 500)
      );
    }
  } else
    return next(
      new HttpError({ message: "Unauthorization! Can't fetch data." })
    );
};

const deleteRequest = async (req, res, next) => {
  const userId = req.userId;
  const { requestId } = req.params;
  const request = await FM_Reuqest.findById(requestId);
  if (userId === request.employeeId.toString()) {
    //đang chờ duyệt
    if (request.status.overallStatus && !request.status.isDeputyHeadApproval) {
      request.isDelete = true;
      await request.save();
      return res.json({ message: "ok" });
    }
  }
  return next(new HttpError("Can't delete", 501));
};

//manage request
const getAllRequest = async (req, res, next) => {
  const currentEmp = req.curEmployee;
  let allRequest;
  const headRole = [
    Roles.ACCOUNTANT_LEAD,
    Roles.DIRECTOR,
    Roles.FM_FACILITY_TEAM_LEAD,
    Roles.FM_ADMIN_LEAD,
  ];
  const isHead = currentEmp.role.some((role) => headRole.includes(role));
  if (isHead) {
    allRequest = await FM_Reuqest.find({})
      .populate([
        {
          path: "employeeId",
          select: ["department", "fullName"],
        },
        "unit",
        "fmBigGroup",
      ])
      .sort({ updatedAt: -1 })
      .exec();
    return res.json({ allRequest });
  } else {
    allRequest = await FM_Reuqest.find({
      // "employeeId.department": currentEmp.department,
    })
      .populate([
        {
          path: "employeeId",
          select: ["department", "fullName"],
          match: { department: currentEmp.department },
        },
        "unit",
        "fmBigGroup",
      ])
      .sort({ updatedAt: -1 });

    const filterArray = allRequest.filter(
      (item) =>
        item.employeeId && item.employeeId.department === currentEmp.department
    );
    return res.json({ allRequest: [...filterArray] });
  }
};

const putSeenRequest = async (req, res, next) => {
  const { requestId } = req.params;

  try {
    const request = await FM_Reuqest.findById(requestId);
    const roleKey = getCurrentRoleKey(getCurrentRole(req.role));
    request.isRead[roleKey] = true;
    await request.save();
    return res.json({ message: "done" });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Error!"));
  }
};

module.exports = {
  getFMType,
  postAddRequestFM,
  putAddRequestFM,
  getRequestByEmployeeId,
  deleteRequest,
  getAllRequest,
  putSeenRequest,
};
