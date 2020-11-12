const mongoose = require("mongoose");
const { model } = require("./employee");
const Schema = mongoose.Schema;

const FM_RequestSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
    //file loại tài sản - có 14 dòng -- để sau
    fmBigGroup: {
      type: Schema.Types.ObjectId,
      ref: "FM_BigGroup",
    },
    //file mã code tài sản
    fmType: {
      type: Schema.Types.ObjectId,
      ref: "FM_Type",
      default: null,
    },
    //danh mục đề xuất
    fmName: {
      type: String,
      trim: true,
    },
    purpose: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      min: 0,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: `{VALUE} is not an integer`,
      },
    },
    imgCollection: {
      type: Array,
    },
    specs: {
      type: String,
      trim: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    unit: {
      type: Schema.Types.ObjectId,
      ref: "FM_Unit",
    },
    unitPricePredict: { type: Number, min: 0, default: 0 },
    totalPricePredict: { type: Number, min: 0, default: 0 },
    status: {
      overallStatus: { type: Boolean, default: true },
      //overallStatus: true - dang duyệt - false : reject
      isDeputyHeadApproval: { type: Boolean, default: false },
      //trưởng bộ phận
      isFMTeamLeadApproval: { type: Boolean, default: false }, //anh Hải - facility teamlead
      isAdminLeadApproval: { type: Boolean, default: false }, //HCTH - Thanh Trang
      isAccountLeadApproval: { type: Boolean, default: false }, //kế toán - Thi
      isDirectorApproval: { type: Boolean, default: false }, // thầy Tùng
    },
    acToken: String,
    rfToken: String,
  },
  {
    timestamps: true,
  }
);

const FM_Request = mongoose.model("FM_Request", FM_RequestSchema);

module.exports = FM_Request;
