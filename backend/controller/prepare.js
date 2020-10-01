const FMType = require("../model/fm-Type");

const addFMType = async (req, res, next) => {
  const data = req.body.table;

  try {
    await Promise.all(
      data.map(async (item) => {
        const dataType = new FMType(item);
        await dataType.save();
      })
    );
    return res.json({ message: "Import Complete" });
  } catch (error) {
    return res.json({ error });
  }
};

module.exports = {
  addFMType,
};
