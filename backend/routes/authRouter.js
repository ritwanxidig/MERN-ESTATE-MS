import express from "express";
import {
  signIn,
  signUp,
  signWithGoogle,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/signIn", signIn);
authRouter.post("/google", signWithGoogle);

export default authRouter;
