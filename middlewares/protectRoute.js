const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");

dotenv.config();

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = await jwt.verify(token, process.env.jwt_secret);
      req.user = await UserModel.findById(decodedToken.id);
      next();
    } catch (error) {
      res.status(400);
      throw new Error("Invalid Token");
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("Token not found");
  }
});

module.exports = protectRoute;
