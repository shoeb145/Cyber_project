import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../controllers/courses.controller.js";
import { roleCheck } from "../middleware/role.middleware.js";

const coursesRoute = express.Router();

coursesRoute.post("/create-courses", roleCheck(["admin"]), createCourse);
coursesRoute.put("/:id", roleCheck(["admin"]), updateCourse);
coursesRoute.get("/", roleCheck(["user", "admin"]), getCourses);
coursesRoute.delete("/:id", roleCheck(["admin"]), deleteCourse);

export default coursesRoute;
