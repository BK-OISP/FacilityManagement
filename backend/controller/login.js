const { OAuth2Client } = require("google-auth-library");
const Employee = require("../model/employee");
const jwtHelper = require("../helper/jwt");
const HttpError = require("../model/http-error");

const client = new OAuth2Client(`${process.env.OAUTH_CLIENT_ID}`);

const googleLogin = async (req, res, next) => {
  const { tokenId } = req.body;
  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: `${process.env.OAUTH_CLIENT_ID}`,
    });

    const { family_name, given_name, picture, email } = response.getPayload();

    const existEmployee = await Employee.findOne({ email: email });
    if (existEmployee) {
      const userToken = jwtHelper.genAccessToken(existEmployee);
      const userRf = jwtHelper.genRefreshToken(existEmployee);
      const userData = {
        acToken: userToken,
        rfToken: userRf,
        fullName: existEmployee.fullName,
        userId: existEmployee._id,
        role: existEmployee.role,
      };
      existEmployee.acToken = userToken;
      existEmployee.rfToken = userRf;
      await existEmployee.save();
      return res.json({ user: userData });
    }
  } catch (error) {
    return new HttpError("Can't log you in. Please try again!");
  }
};

module.exports = {
  googleLogin,
};
