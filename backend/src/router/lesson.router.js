import express from "express";
import { createLesson } from "../controllers/lesson.controller.js";

const lessonRoute = express.Router();

lessonRoute.post("/create-lesson", createLesson);

export default lessonRoute;
