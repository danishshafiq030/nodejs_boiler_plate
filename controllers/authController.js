const asyncHandler = require("express-async-handler");

// Models
const UserModel = require("../models/UserModel");

// Request: POST
// Route: POST /api/v1/auth/login
// Access: Public

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json("Please enter email or password");
  }

  const isUser = await UserModel.findOne({ email });

  if (!isUser) {
    return res.status(422).json("No user found with this email");
  }

  const isMatched = await isUser.matchPassword(password);

  if (!isMatched) {
    return res.status(422).json("Email or Password is inValid");
  }

  const data = {
    id: isUser._id,
    email: isUser.email,
    token: generateWebToken(isUser._id),
  };

  res.status(200).json("Login successfully", data);
});

// Request: POST
// Route: POST /api/v1/auth/register
// Access: Public

const registerController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const isAlreadyUserExists = await UserModel.findOne({ email });

  if (isAlreadyUserExists) {
    return res.status(409).json("User already exists");
  }

  const registerUser = await UserModel.create({
    email,
    password,
  });

  if (!registerUser) {
    return res.status(500).json("Something went wrong");
  }

  const data = {
    id: registerUser._id,
    email: registerUser.email,
    token: generateWebToken(registerUser._id),
  };

  res.status(200).json("User Registered Successfully", data);
});

module.exports = {
  loginController,
  registerController,
};
