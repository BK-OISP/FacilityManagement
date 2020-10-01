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
  },
  //file mã code tài sản
  smallType: {
    type: String,
    enum: [
      { name: "Máy scan", code: "SCA" },
      { name: "Máy photo", code: "PHO" },
      { name: "Máy in", code: "PRI" },
      { name: "Máy vi tính", code: "COM" },
      { name: "Máy laptop", code: "LAP" },
      { name: "Máy tính bảng", code: "TAB" },
      { name: "Máy server", code: "SER" },
      { name: "Switch mạng", code: "SWI" },
      { name: "Router mạng", ode: "ROU" },
      { name: "Controler wifi", code: "CONW" },
      { name: "AP wifi", code: "AP" },
      { name: "Tủ jack server", code: "JSER" },
      { name: "Controler Camera", code: "CONC" },
      { name: "Converter - connect network", code: "NETC" },
      { name: "UPS lưu điện", code: "UPS" },
      { name: "Máy quét mã", code: "SCAV" },
      { name: "Máy lạnh", code: "AIR" },
      { name: "Bình nóng lạnh", code: "WAF" },
      { name: "Tủ lạnh", code: "REF" },
      { name: "Quạt trần", code: "F1" },
      { name: "Quạt tường", code: "F2" },
      { name: "Quạt đứng", code: "F3" },
      { name: "Máy ảnh - máy quay phim", code: "SHOO" },
      { name: "Đèn Studio", code: "LIGH" },
      { name: "Thiết bị ngành ảnh", code: "STU" },
      { name: "Bàn", code: "BAN" },
      { name: "Ghế", name: "GHE" },
      { name: "Tủ - kệ gỗ", code: "TUK" },
      { name: "Micro âm thanh", code: "MIC" },
      { name: "Amly khuếch đại", code: "AML" },
      { name: "Loa", code: "LOA" },
      { name: "Filter Sound", code: "FIS" },
      { name: "Hệ thống âm thanh", code: "SYSS" },
      { name: "Điện thoại bàn", code: "TELP" },
      { name: "Máy chiếu", code: "PROJ" },
      { name: "Màn chiếu", code: "SCRE" },
      { name: "Tivi", name: "TIV" },
      { name: "Máy ghi âm", code: "REC" },
      { name: "Máy assett", code: "CAS" },
      { name: "Màn hình chuyên dụng TTNB", code: "LIF" },
      { name: "Máy chấm công", code: "FIR" },
    ],
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
  unitPrice: { type: Number, min: 0 },
  totalPrice: { type: Number, min: 0 },
  status: {
    isDeputyHeadApproval: Boolean, //trưởng bộ phận
    isFMTeamLeadApproval: Boolean, //anh Hải - facility teamlead
    isAdmiLeadApproval: Boolean, //HCTH - Thanh Trang
    isAccountLeadApproval: Boolean, //kế toán - Diệu
    isDirectorApproval: Boolean, // thầy Tùng
  },
});

const FM_Request = mongoose.model("FM_Request", FM_RequestSchema);

module.exports = FM_Request;
