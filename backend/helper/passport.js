const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");

const Employee = require("../model/employee");
const HttpError = require("../model/http-error");

passport.use(
  new GoogleStrategy(
    {
      callbackURL: process.env.REDIRECT_OAUTH,
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
    },
    async (acessToken, refreshToken, profile, done) => {
      try {
        const existEmp = await Employee.findOne({
          email: profile.emails[0].value,
        }); //will add isActive : true - IMPORTANT

        if (existEmp) {
          return done(null, existEmp);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);
