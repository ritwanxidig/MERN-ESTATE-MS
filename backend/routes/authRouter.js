import express from "express";
import {
  signIn,
  signOut,
  signUp,
  signWithGoogle,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/signIn", signIn);
authRouter.post("/google", signWithGoogle);
authRouter.post("/signOut", signOut);

export default authRouter;
