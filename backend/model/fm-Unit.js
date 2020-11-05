const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FM_UnitSchema = new Schema({
  value: {
    type: String,
    trim: true,
  },
  label: {
    type: String,
    trim: true,
  },
});

const FM_Unit = mongoose.model("FM_Unit", FM_UnitSchema);

module.exports = FM_Unit;
