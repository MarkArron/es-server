const jwt = require("jsonwebtoken");

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_PASSWORD, { expiresIn: "8h" });

module.exports = generateToken;
