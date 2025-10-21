import express from "express";
import { createModule } from "../controllers/module.controller.js";

const moduleRoute = express.Router();

moduleRoute.post("/create-module", createModule);

export default moduleRoute;
