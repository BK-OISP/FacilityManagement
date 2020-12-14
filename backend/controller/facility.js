const addRequestMiddleware = require("../middleware/addRequestMiddleware");

const FM_Type = require("../model/fm-Type");
const HttpError = require("../model/http-error");
const FM_BigGroup = require("../model/fm-BigGroup");
const FM_Reuqest = require("../model/fm-Request");
const FM_Unit = require("../model/fm-Unit");
const Roles = require("../helper/role");
const { json } = require("body-parser");

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
      value: facilityRequest.unit,
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
        "status.isDeputyHeadApproval": null,
        "status.isFMTeamLeadApproval": null,
        "status.isAdminLeadApproval": null,
        "status.isAccountLeadApproval": null,
        "status.isDirectorApproval": null,
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
  const directorRole = [Roles.DIRECTOR];
  const accountantRole = [Roles.ACCOUNTANT_LEAD];
  const facilityLeadRole = [Roles.FM_FACILITY_TEAM_LEAD];
  const teamLeadRole = [Roles.FM_DEPUTY_HEAD];
  const adminRole = [Roles.FM_ADMIN_LEAD];

  const isDirector = currentEmp.role.some((role) =>
    directorRole.includes(role)
  );
  const isAccountant = currentEmp.role.some((role) =>
    accountantRole.includes(role)
  );
  const isFacilityLeadRole = currentEmp.role.some((role) =>
    facilityLeadRole.includes(role)
  );
  const isTeamLead = currentEmp.role.some((role) =>
    teamLeadRole.includes(role)
  );
  const isAdminLead = currentEmp.role.some((role) => adminRole.includes(role));

  if (isDirector) {
    allRequest = await FM_Reuqest.find({
      status: {
        isDeputyHeadApproval: true,
        isFMTeamLeadApproval: true,
        isAdminLeadApproval: true,
        isAccountLeadApproval: true,
      },
    })
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
  }

  if (isAccountant) {
    allRequest = await FM_Reuqest.find({
      status: {
        isDeputyHeadApproval: true,
        isFMTeamLeadApproval: true,
        isAdminLeadApproval: true,
      },
    })
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
  }

  if (isFacilityLeadRole) {
    allRequest = await FM_Reuqest.find({
      status: {
        isDeputyHeadApproval: true,
      },
    })
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
  }
  if (isTeamLead && !isAdminLead) {
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
      .sort({ updatedAt: -1 })
      .exec();

    const filterArray = allRequest.filter(
      (item) =>
        item.employeeId &&
        item.employeeId.department === currentEmp.department &&
        item.status.overallStatus === true
    );
    return res.json({ allRequest: [...filterArray] });
  }

  if (isAdminLead) {
    allRequest = await FM_Reuqest.find({
      $or: [
        { "status.overallStatus": true },
        {
          "status.overallStatus": false,
          "status.isAdminLeadApproval": false,
        },
      ],
    })
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
    return next(new HttpError("Error!"));
  }
};

const putFMTeamLeadEditRequest = async (req, res, next) => {
  const { requestId } = req.params;
  const { unitPricePredict, specs, note, isFMLeadApprove, isDraft } = req.body;

  try {
    const request = await FM_Reuqest.findById(requestId);
    if (request) {
      if (request.status.overallStatus) {
        // Save as draft
        if (isDraft) {
          if (
            request.status.overallStatus &&
            !!request.status.isFMTeamLeadApproval === false
          ) {
            const editedRequest = await FM_Reuqest.findByIdAndUpdate(
              requestId,
              {
                unitPricePredict: unitPricePredict,

                specs: specs,
                notes: {
                  isFMTeamLeadApproval: note,
                },
              }
            );
            editedRequest.totalPricePredict =
              editedRequest.quantity * editedRequest.unitPricePredict;
            await editedRequest.save();
            return res.json({ message: "Save complete" });
          }
        } else {
          if (isFMLeadApprove) {
            if (!!request.status.isFMTeamLeadApproval === false) {
              const editedRequest = await FM_Reuqest.findByIdAndUpdate(
                requestId,
                {
                  status: {
                    overallStatus: true,
                    isFMTeamLeadApproval: true,
                  },
                  unitPricePredict: unitPricePredict,

                  specs: specs,
                  notes: {
                    isFMTeamLeadApproval: note,
                  },
                }
              );
              editedRequest.totalPricePredict =
                editedRequest.quantity * editedRequest.unitPricePredict;
              await editedRequest.save();
              return res.json({ message: "Save complete" });
            }
          } else {
            if (!!request.status.isFMTeamLeadApproval === false) {
              const editedRequest = await FM_Reuqest.findByIdAndUpdate(
                requestId,
                {
                  status: {
                    overallStatus: false,
                    isFMTeamLeadApproval: false,
                  },
                  unitPricePredict: unitPricePredict,
                  specs: specs,
                  notes: {
                    isFMTeamLeadApproval: note,
                  },
                }
              );
              editedRequest.totalPricePredict =
                editedRequest.quantity * editedRequest.unitPricePredict;
              await editedRequest.save();
              return res.json({ message: "Save complete" });
            }
          }
        }
      }
      return next(new HttpError("Can't save request", 501));
    }
  } catch (error) {
    return next(new HttpError("Can't save request", 501));
  }
};

const putOtherRoleManageRequest = async (req, res, next) => {
  const { requestId } = req.params;
  const { note, isDraft } = req.body;
  const currentEmp = req.curEmployee;
  const objectKey = Object.keys(req.body);
  const statusKey = objectKey[1];
  const statusValue = req.body[statusKey];
  const adminRole = [Roles.FM_ADMIN_LEAD];
  const isAdminLead = currentEmp.role.some((role) => adminRole.includes(role));
  try {
    const request = await FM_Reuqest.findById(requestId);
    if (request && request.status.overallStatus) {
      if (isDraft) {
        if (
          request.status.overallStatus &&
          !!request.status[statusKey] === false
        ) {
          await FM_Reuqest.findByIdAndUpdate(requestId, {
            notes: {
              [statusKey]: note,
            },
          });
          return res.json({ message: "Update complete" });
        }
      } else {
        // duyệt
        if (statusValue) {
          if (
            request.status.overallStatus &&
            !!request.status[statusKey] === false
          ) {
            const editedRequest = await FM_Reuqest.findByIdAndUpdate(
              requestId,
              {
                notes: {
                  [statusKey]: note,
                },
                status: {
                  [statusKey]: true,
                },
              }
            );
            if (isAdminLead) {
              editedRequest.status.isAdminLeadApproval = true;
              await editedRequest.save();
            }
            return res.json({ message: "Update complete" });
          }
        } else {
          // huỷ
          if (
            request.status.overallStatus &&
            !!request.status[statusKey] === false &&
            note !== ""
          ) {
            console.log("check fail");
            const editedRequest = await FM_Reuqest.findByIdAndUpdate(
              requestId,
              {
                notes: {
                  [statusKey]: note,
                },
                status: {
                  overallStatus: false,
                  [statusKey]: false,
                },
              }
            );
            if (isAdminLead) {
              editedRequest.status.isAdminLeadApproval = true;
              await editedRequest.save();
            }
            return res.json({ message: "Update complete" });
          }
        }
      }
    }
    return next(new HttpError("Can't save request", 501));
  } catch (error) {
    return next(new HttpError("Can't save request", 501));
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
  putFMTeamLeadEditRequest,
  putOtherRoleManageRequest,
};
