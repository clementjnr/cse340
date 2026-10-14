import express from "express";

import {
  buildProjects,
  buildProjectDetail,
  volunteerForProject,
  removeVolunteerFromProject
} from "../src/controllers/projectsController.js";

import { requireLogin } from "../src/middleware/auth.js";

const router = express.Router();

router.get("/", buildProjects);
router.post("/:id/volunteer", requireLogin, volunteerForProject);
router.post("/:id/unvolunteer", requireLogin, removeVolunteerFromProject);
router.get("/:id", buildProjectDetail);

export default router;
