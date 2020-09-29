const JWT = require("jsonwebtoken");

const genAccessToken = (userData) => {
  return JWT.sign(
    {
      iss: "OISP - Management",
      userId: userData._id,
      // exp: new Date().setDate(new Date().getDate() + 1),
      expiresIn: "7 days",
    },
    process.env.ACCESS_TOKEN_SECRET
  );
};

const genRefreshToken = (userData) => {
  return JWT.sign(
    {
      iss: "Annien - Porfolio",
      userID: userData._id,
      iat: new Date().getTime(),
    },
    process.env.REFRESH_TOKEN_SECRET
  );
};

const verifyToken = (token, secretKey) => {
  return JWT.verify(token, secretKey, (err, data) => {
    if (err) return false;
    return data;
  });
};

module.exports = {
  genAccessToken,
  genRefreshToken,
  verifyToken,
};
