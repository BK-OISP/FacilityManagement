const express = require("express");

const loginController = require("../controller/login");

const router = express.Router();

router.post("/googlelogin", loginController.googleLogin);

module.exports = router;
