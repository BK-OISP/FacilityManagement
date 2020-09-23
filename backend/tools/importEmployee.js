const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

const Employee = require("../model/employee");

const url =
  "mongodb://OISP_ADMIN:LcxUen4oyGTB7H20OvJg@103.221.223.26:24569/admin?retryWrites=true&w=majority";

const mongooseUrl =
  "mongodb://admin_test:tUbswWCPZZIutNsIiLId@103.221.223.26:24569/facility_testing?retryWrites=true&w=majority";

const convertStringtToDate = (dateString) => {
  if (dateString) {
    const dateParts = dateString.split("/");
    const dateObject = new Date(
      +dateParts[2],
      +dateParts[1] - 1,
      +dateParts[0] + 1
    );
    return dateObject;
  }
  return null;
};

const convertDate = async () => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.connect(mongooseUrl).then(() => {
      console.log("mongoose ");

      client
        .db("facility_testing")
        .collection("employee")
        .find()
        .toArray()
        .then((items) => {
          // console.log(items);
          // items.map(item => {
          // })
          items.map((employee) => {
            const tempEmployee = {
              ...employee,
              _id: null,
              DOB: convertStringtToDate(employee.DOB),
              issueDate: convertStringtToDate(employee.issueDate),
              dateIn: convertStringtToDate(employee.dateIn),
              dateUnion: convertStringtToDate(employee.dateUnion),
            };
            const temp = new Employee({ ...tempEmployee });
            temp.save();
          });
        })
        .catch((err) => console.log(err));
    });

    console.log("Connect ok");
  } catch (error) {
    console.log(error);
  }
};
