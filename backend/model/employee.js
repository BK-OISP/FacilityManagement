const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  gender: String,
  department: String,
  degree: String,
  fullName: String,
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
