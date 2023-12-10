import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
  updateUserAvatar,
} from "../controllers/user.controllers.js";
import { IsAuthenticated } from "../middlewares/index.js";

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);
userRoutes.put("/updateAvatar/:id", updateUserAvatar);
userRoutes.put("/:id", IsAuthenticated, updateUser);
userRoutes.delete("/:id", IsAuthenticated, deleteUser);

export default userRoutes;
