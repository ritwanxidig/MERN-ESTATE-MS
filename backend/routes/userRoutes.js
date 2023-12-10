import express from "express";
import {
  getAllUsers,
  updateUserAvatar,
} from "../controllers/user.controllers.js";

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);
userRoutes.put("/updateAvatar/:id", updateUserAvatar);

export default userRoutes;
