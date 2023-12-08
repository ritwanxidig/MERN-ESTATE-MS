import express from "express";
import { userModel } from "../models/user.model.js";

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
