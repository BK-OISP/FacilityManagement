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

const postAddRequestFM = (req, res, next) => {
  console.log("ok");
  return res.json({ mess: "ok" });
};

module.exports = {
  getFMType,
  postAddRequestFM,
};
