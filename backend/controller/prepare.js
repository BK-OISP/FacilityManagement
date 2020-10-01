const FMType = require("../model/fm-Type");

const addFMType = (req, res, next) => {
  const data = req.body.table;
  data.forEach(async (element) => {
    try {
      const dataType = new FMType(element);
      await dataType.save();
    } catch (error) {
      return res.json({ error });
    }
  });
  return res.json({ message: "Import Complete" });
};

module.exports = {
  addFMType,
};
