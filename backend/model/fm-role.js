const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FM_RoleSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  email: {
    type: mongoose.Schema.Types.String,
    ref: "Employee",
  },
  role: String,
});

const FM_Role = mongoose.model("FM_Role", FM_RoleSchema);
module.exports = FM_Role;
