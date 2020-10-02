const mongoose = require("mongoose");
const { model } = require("./employee");
const Schema = mongoose.Schema;

const FM_RequestSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  },
  //file loại tài sản - có 14 dòng
  bigGroup: {
    type: String,
    trim: true,
    default: "",
  },
  //file mã code tài sản
  fmType: {
    type: Schema.Types.ObjectId,
    ref: "FM_Type",
  },
  //danh mục đề xuất
  name: {
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
  specs: {
    type: String,
    trim: true,
  },
  unitPrice: { type: Number, min: 0 },
  totalPrice: { type: Number, min: 0 },
  status: {
    //trưởng bộ phận
    isDeputyHeadApproval: { type: Boolean, default: false },
    isFMTeamLeadApproval: { type: Boolean, default: false }, //anh Hải - facility teamlead
    isAdmiLeadApproval: { type: Boolean, default: false }, //HCTH - Thanh Trang
    isAccountLeadApproval: { type: Boolean, default: false }, //kế toán - Thi
    isDirectorApproval: { type: Boolean, default: false }, // thầy Tùng
  },
});

const FM_Request = mongoose.model("FM_Request", FM_RequestSchema);

module.exports = FM_Request;
