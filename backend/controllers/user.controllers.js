import express from "express";
import bcryptjs from "bcryptjs";
import { userModel } from "../models/user.model.js";
import { errorHandler } from "../Utils/error.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (users.length <= 0)
      return res.status(400).json({ msg: "there is no data" });
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const updateUser = async (req, res, next) => {
  // checking if the user is owner using user object in req
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You are not the owner"));
  try {
    const { id } = req.params;
    // hash password if the request body have password:
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          avatar: req.body.avatar,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateUserAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const { id } = req.params;
    if (!avatar) next(errorHandler(400, "avatar and userId is required"));
    const targetUser = await userModel.findById(id);
    if (!targetUser) next(errorHandler(400, "this user does not found"));
    targetUser.avatar = avatar;
    await targetUser.save();
    return res.status(200).json("successfully updated the profile");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You are not the owner"));
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.clearCookie("access_token");
    return res.status(200).json("Deleted successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
