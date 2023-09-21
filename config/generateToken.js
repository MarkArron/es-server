const jwt = require("jsonwebtoken");

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_PASSWORD, { expiresIn: "1y" });

module.exports = generateToken;
