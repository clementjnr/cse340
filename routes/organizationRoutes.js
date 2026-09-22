import express from "express";

import {
  buildOrganizations,
  buildOrganizationDetail
} from "../src/controllers/organizationsController.js";


const router = express.Router();


router.get("/", buildOrganizations);

router.get("/:id", buildOrganizationDetail);


export default router;