import asyncHandler from "express-async-handler";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

const login = asyncHandler(async (req: Request, res: Response) => {
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
  const token = jwt.sign({ id: existingUser.id }, process.env.JWT as string, {
    expiresIn: "7d",
  });
  res.status(200).json({ token, name, message: "User loged in" });
});

const register = asyncHandler(async (req: Request, res: Response) => {
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

export { login, register };
