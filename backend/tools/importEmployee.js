const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

const Employee = require("../model/employee");

const url =
  "mongodb://OISP_ADMIN:LcxUen4oyGTB7H20OvJg@103.221.223.26:24569/admin?retryWrites=true&w=majority";

const mongooseUrl =
  "mongodb://admin_test:tUbswWCPZZIutNsIiLId@103.221.223.26:24569/facility_testing?retryWrites=true&w=majority";

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
            let temp = new Employee({
              gender: employee.gender,
              department: employee.department,
              degree: employee.degree,
              fullName: employee.fullName,
            });
            temp
              .save()
              .then(() => console.log("ok"))
              .catch((err) => console.log(err));
          });
        })
        .catch((err) => console.log(err));
    });

    console.log("Connect ok");

    const db = client.db("facility_testing");
  } catch (error) {
    console.log(error);
  }
};

convertDate();
