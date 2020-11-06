const Employee = require("../model/employee");
const HttpError = require("../model/http-error");

const checkRole = (...approles) => async (req, res, next) => {
  const currentEmployee = await Employee.findById(req.userId);

  if (!currentEmployee) return next(new HttpError("Unauthorization!", 401));

  for (eachRole of currentEmployee.role) {
    if (approles.includes(eachRole)) {
      return next();
    }
  }
  return next(new HttpError("Unauthorization!", 401));
};

module.exports = checkRole;
