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
    return new HttpError("Something went wrong", 500);
  }
};

module.exports = {
  getFMType,
  postAddRequestFM,
};
