const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateWebToken = (id) => {
  const token = jwt.sign({ id, expiresIn: "7d" }, process.env.jwt_secret);
  return token;
};

module.exports = generateWebToken;
