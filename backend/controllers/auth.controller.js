import express from "express";
import bcryptjs from "bcryptjs";
import { userModel } from "../models/user.model.js";
import { errorHandler } from "../Utils/error.js";

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return errorHandler(
        400,
        "Username, email, and password are required"
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
