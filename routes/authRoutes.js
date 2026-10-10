import express from "express";

import {
  buildRegister,
  registerUser,
  buildLogin,
  loginUser,
  logoutUser
} from "../src/controllers/authController.js";

import {
  registerValidation,
  loginValidation,
  checkAuthValidation
} from "../src/validators/authValidators.js";


const router = express.Router();


router.get(
  "/register",
  buildRegister
);


router.post(
  "/register",
  registerValidation,
  checkAuthValidation,
  registerUser
);


router.get(
  "/login",
  buildLogin
);


router.post(
  "/login",
  loginValidation,
  checkAuthValidation,
  loginUser
);


router.post(
  "/logout",
  logoutUser
);


export default router;