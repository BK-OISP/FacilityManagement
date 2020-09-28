const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  gender: String,
  department: String,
  degree: String,
  MSCB: String,
  fullName: String,
  blockArea: String,
  departmentArea: String,
  DOB: Date,
  nationalID: String,
  issueDate: Date,
  issueBy: String,
  placeDOB: String,
  hometown: String,
  permanentAddress: String,
  currentAddress: String,
  taxCode: String,
  bankID: String,
  bank: String,
  branch: String,
  transOff: String,
  dateIn: Date,
  email: {
    type: String,
    index: true,
    unique: true,
  },
  personalEmail: String,
  unionMem: Boolean,
  noteUnion: String,
  dateUnion: Date,
  contractType: {
    type: String,
    // enum: ["Biên chế, HĐ đơn vị"],
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
