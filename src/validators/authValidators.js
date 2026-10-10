import { body, validationResult } from "express-validator";


const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "Name must be between 2 and 100 characters."
    ),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage(
      "Password must be at least 6 characters."
    )
];


const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .withMessage("Password is required.")
];


const checkAuthValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.validationErrors = errors.array();
  } else {
    req.validationErrors = [];
  }

  next();
};


export {
  registerValidation,
  loginValidation,
  checkAuthValidation
};