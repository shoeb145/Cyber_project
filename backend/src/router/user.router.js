import express from "express";

import { me } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/me", me);

export default userRouter;
