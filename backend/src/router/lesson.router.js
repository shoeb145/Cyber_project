import express from "express";
import {
  createLesson,
  getLessonsByModule,
  updateLesson,
} from "../controllers/lesson.controller.js";
import { roleCheck } from "../middleware/role.middleware.js";

const lessonRoute = express.Router();

lessonRoute.post("/create-lesson", roleCheck(["admin"]), createLesson);
lessonRoute.get(
  "/:id/lessons",
  roleCheck(["admin", "user"]),
  getLessonsByModule
);
lessonRoute.put("/:id", roleCheck(["admin"]), updateLesson);

export default lessonRoute;
