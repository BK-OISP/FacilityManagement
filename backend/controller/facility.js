const addRequestMiddleware = require("../middleware/addRequestMiddleware");

const FM_Type = require("../model/fm-Type");
const HttpError = require("../model/http-error");
const FM_BigGroup = require("../model/fm-BigGroup");
const FM_Reuqest = require("../model/fm-Request");
const FM_Unit = require("../model/fm-Unit");

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
    console.log(error);
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
  console.log("check");
};

module.exports = {
  getFMType,
  postAddRequestFM,
  putAddRequestFM,
  getRequestByEmployeeId,
  deleteRequest,
  getAllRequest,
};
