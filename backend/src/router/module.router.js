import express from "express";
import {
  createModule,
  getModulesByCourse,
} from "../controllers/module.controller.js";
import { roleCheck } from "../middleware/role.middleware.js";

const moduleRoute = express.Router();

moduleRoute.post("/create-module", roleCheck(["admin"]), createModule);
moduleRoute.get(
  "/:id/modules",
  roleCheck(["admin", "user"]),
  getModulesByCourse
);

export default moduleRoute;
