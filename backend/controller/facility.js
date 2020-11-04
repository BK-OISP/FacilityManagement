const addRequestMiddleware = require("../middleware/addRequestMiddleware");

const FM_Type = require("../model/fm-Type");
const HttpError = require("../model/http-error");
const FM_BigGroup = require("../model/fm-BigGroup");
const FM_Reuqest = require("../model/fm-Request");

const getFMType = async (req, res, next) => {
  try {
    const allType = await FM_BigGroup.find({});
    return res.json({ allType });
  } catch (error) {
    return next(new HttpError("Can't find all FM Types", 500));
  }
};

const postAddRequestFM = async (req, res, next) => {
  try {
    await addRequestMiddleware(req, res);
    const facilityRequest = JSON.parse(req.body.facilityRequest);

    const findFmBigGroup = await FM_BigGroup.findOne({
      label: facilityRequest.fmBigGroup,
    });

    if (findFmBigGroup) {
      let imgCollection = [];
      if (req.files && req.files.length > 0) {
        imgCollection = req.files.map((item) => item.path);
      }

      const convertRequest = {
        ...facilityRequest,
        fmBigGroup: findFmBigGroup._id,
        imgCollection: imgCollection,
        employeeId: req.userId,
        // fmType: facilityRequest.fmType !== "" ? facilityRequest.fmType : null,
      };

      const saveRequest = new FM_Reuqest(convertRequest);

      await saveRequest.save();
    }

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

    if (!findFmBigGroup) return next(new HttpError("Erorr!", 501));

    if (req.files && req.files.length > 0) {
      imgCollection = req.files.map((item) => item.path);
    }

    const convertRequest = {
      ...facilityRequest,
      imgCollection: imgCollection,
      fmBigGroup: findFmBigGroup._id,
    };

    if (imgCollection.length === 0) {
      delete convertRequest.imgCollection;
    }

    await FM_Reuqest.findOneAndUpdate(
      {
        _id: requestId,
        employeeId: req.userId,
        overallStatus: true,
        isDeputyHeadApproval: false,
        isFMTeamLeadApproval: false,
        isAdminLeadApproval: false,
        isAccountLeadApproval: false,
        isDirectorApproval: false,
      },
      convertRequest
    );

    return res.json({ message: "ok" });
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

const getRequestByEmployeeId = async (req, res, next) => {
  const { employeeId } = req.params;

  if (req.userId === employeeId) {
    try {
      const allRequest = await FM_Reuqest.find({
        employeeId: employeeId,
        isDelete: false,
      })
        .populate("fmBigGroup")
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

module.exports = {
  getFMType,
  postAddRequestFM,
  putAddRequestFM,
  getRequestByEmployeeId,
  deleteRequest,
};
