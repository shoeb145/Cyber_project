import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import errorMiddleware from "./middleware/error.middleware.js";
import authRouter from "./router/auth.router.js";
import userRouter from "./router/user.router.js";
import authorization from "./middleware/auth.middleware.js";

import coursesRoute from "./router/courses.router.js";
import moduleRoute from "./router/module.router.js";
import lessonRoute from "./router/lesson.router.js";
import cors from "cors";
import progressRoute from "./router/progress.router.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174"], // frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // important!
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", authorization, userRouter);
app.use("/api/courses", authorization, coursesRoute);
app.use("/api/module", authorization, moduleRoute);
app.use("/api/lesson", authorization, lessonRoute);
app.use("/api/progress",progressRoute)

app.use(errorMiddleware);

app.listen(5001, () => {
  console.log(`connected to server on port 5001`);
  connectDB();
});
