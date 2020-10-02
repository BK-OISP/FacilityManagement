const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FM_TypeSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  code: {
    type: String,
    trim: true,
  },
});

const FM_Type = mongoose.model("FM_Type", FM_TypeSchema);

module.exports = FM_Type;
