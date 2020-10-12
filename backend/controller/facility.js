const addRequestMiddleware = require("../middleware/addRequestMiddleware");

const FM_Type = require("../model/fm-Type");
const HttpError = require("../model/http-error");
const FM_BigGroup = require("../model/fm-BigGroup");

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
    const requestFacility = JSON.parse(req.body.requestFacility);

    console.log(requestFacility);

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
