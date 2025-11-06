import express from "express";
import {
  signUp,
  signIn,
  verifyUser,
  signOut,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.get("/verify", verifyUser);
authRouter.post("/sign-out", signOut);

export default authRouter;
