import express from "express";

import {
  buildDashboard
} from "../src/controllers/accountController.js";

import {
  requireLogin
} from "../src/middleware/auth.js";


const router = express.Router();


router.get(
  "/dashboard",
  requireLogin,
  buildDashboard
);


export default router;