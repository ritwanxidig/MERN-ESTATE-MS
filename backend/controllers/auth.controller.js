import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import { errorHandler } from "../Utils/error.js";

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      next(errorHandler(400, "Username, email, and password are required"));
    const hashedPassword = bcryptjs.hashSync(password, 10);
    var newUser = new userModel({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      next(errorHandler(400, "Email and password are required"));
    const user = await userModel.findOne({ email });
    if (!user) next(errorHandler(400, "User not found"));
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) next(errorHandler(400, "Wrong password"));

    const { password: hashedPassword, ...userInfo } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
