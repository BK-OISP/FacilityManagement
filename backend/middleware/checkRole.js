const Employee = require("../model/employee");
const HttpError = require("../model/http-error");

const checkRole = (...approles) => async (req, res, next) => {
  const currentEmployee = await Employee.findById(req.userId);

  if (currentEmployee) {
    for (eachRole of currentEmployee.role) {
      if (approles.includes(eachRole)) {
        console.log("true");
        return next();
      }
    }
  }
  return next(new HttpError("Unauthorization!", 401));
};

module.exports = checkRole;
