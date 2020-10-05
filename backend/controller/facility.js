const FM_Type = require("../model/fm-Type");
const HttpError = require("../model/http-error");

const getFMType = async (req, res, next) => {
  try {
    const allType = await FM_Type.find({});
    return res.json({ allType });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Can't find all FM Types", 500));
  }
};

module.exports = {
  getFMType,
};
