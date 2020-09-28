const express = require("express");
const passport = require("passport");
const router = express.Router();

const jwtHelper = require("../helper/jwt");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const userToken = jwtHelper.genAccessToken(req.user);
    const userRf = jwtHelper.genRefreshToken(req.user);
    //MUST FIND ALL ROLES IN ALL TABLES USER ROLE
    const userData = {
      acToken: userToken,
      rfToken: userRf,
      userData: req.user,
    };
    res.json(userData);
  }
);

module.exports = router;
