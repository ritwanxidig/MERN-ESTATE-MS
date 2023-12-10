import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import { errorHandler } from "../Utils/error.js";

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return next(
        errorHandler(400, "Username, email, and password are required")
      );
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
      return next(errorHandler(400, "Email and password are required"));
    const user = await userModel.findOne({ email });
    if (!user) return next(errorHandler(400, "User not found"));
    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) return next(errorHandler(400, "Wrong password"));

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

export const signWithGoogle = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;
    if (!name || !email || !photo)
      return next(errorHandler(400, "name, email and photo are required"));
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...otherInfo } = existUser._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(otherInfo);
    } else {
      // generate password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      // generate username
      const generatedUsername =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString().slice(-4);

      // then create the new user
      const newUser = new userModel({
        username: generatedUsername,
        email,
        password: hashedPassword,
        avatar: photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
