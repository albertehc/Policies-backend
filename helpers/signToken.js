const jwt = require("jsonwebtoken");

module.exports = (payload) => {
  return jwt.sign(payload, process.env.SECRETKEY || "SOMESUPERSECRETKEY", {
    expiresIn: process.env.TOKENEXPIRATION || "1y",
  });
};
