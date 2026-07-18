const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(401);
    throw new Error("User not found");
  }
  const name = existingUser.name;
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Wrong password");
  }
  const token = jwt.sign({ id: existingUser.id }, process.env.JWT, {
    expiresIn: "7d",
  });
  res.status(200).json({ token, name, message: "User loged in" });
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }
  const newPass = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: newPass });
  await user.save();
  res.status(201).json({ message: "User registered" });
});

module.exports = { login, register };
