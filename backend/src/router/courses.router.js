import express from "express";
import { createCourse, getCourses } from "../controllers/courses.controller.js";

const coursesRoute = express.Router();

coursesRoute.post("/create-courses", createCourse);
coursesRoute.get("/", getCourses);

export default coursesRoute;
