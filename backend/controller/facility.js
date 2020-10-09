const addRequestMiddleware = require("../middleware/addRequestMiddleware");

const FM_Type = require("../model/fm-Type");
const HttpError = require("../model/http-error");

const getFMType = async (req, res, next) => {
  try {
    const allType = await FM_Type.find({});
    return res.json({ allType });
  } catch (error) {
    return next(new HttpError("Can't find all FM Types", 500));
  }
};

const postAddRequestFM = async (req, res, next) => {
  try {
    await addRequestMiddleware(req, res);
    return res.json({ mess: "ok" });
  } catch (error) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res
        .status(406)
        .json({ message: "Exceeds the number of files allowed to upload" });
    }
  }
};

module.exports = {
  getFMType,
  postAddRequestFM,
};
