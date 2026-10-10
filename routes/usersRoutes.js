import express from "express";

import {
  buildUsers
} from "../src/controllers/usersController.js";

import {
  requireRole
} from "../src/middleware/auth.js";


const router = express.Router();


router.get(
  "/users",
  requireRole("admin"),
  buildUsers
);


export default router;