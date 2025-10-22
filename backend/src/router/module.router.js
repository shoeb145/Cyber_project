import express from "express";
import { createModule, getModule } from "../controllers/module.controller.js";

const moduleRoute = express.Router();

moduleRoute.post("/create-module", createModule);
moduleRoute.get("/:id", getModule);

export default moduleRoute;
