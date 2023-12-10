import express from "express";
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
