require("dotenv").config();
require("./helper/passport");

const path = require("path");
const fs = require("fs");

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");

const loginRoute = require("./route/loginRoute");

const app = express();

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(bodyParser.json());

app.use("/oisp/upload", express.static(path.join(__dirname, "upload")));

//route
app.use("/oisp/auth", loginRoute);

//Error handling
app.use((err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, () => {});
  }
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({ message: err.message || "Something went wrong!" });
});

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {});

// require("crypto").randomBytes(64).toString('hex')
