const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FM_BigGroupSchema = new Schema({
  value: {
    type: String,
    trim: true,
  },
  label: {
    type: String,
    trim: true,
  },
});

const FM_BigGroup = mongoose.model("FM_BigGroup", FM_BigGroupSchema);

module.exports = FM_BigGroup;
