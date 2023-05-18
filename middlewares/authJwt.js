const jwt = require("jsonwebtoken");
const { secret } = require("../token-config");
const cookieParser = require("cookie-parser");

verifyToken = (req, res, next) => {
  cookieParser.JSONCookie;
  let token = req.cookies.jwt;
  console.log(token);

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
