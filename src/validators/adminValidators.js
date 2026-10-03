import { body, validationResult } from "express-validator";

const organizationValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Organization name must be between 3 and 100 characters."
    ),

  body("contact_email")
    .trim()
    .notEmpty()
    .withMessage("Contact email is required.")
    .isEmail()
    .withMessage("Please enter a valid contact email."),

  body("description")
    .optional({ values: "falsy" })
    .trim(),

  body("location")
    .optional({ values: "falsy" })
    .trim(),

  body("image_filename")
    .optional({ values: "falsy" })
    .trim()
];

const projectValidation = [
  body("organization_id")
    .notEmpty()
    .withMessage("Please select an organization.")
    .isInt()
    .withMessage("Please select a valid organization."),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Project title must be between 3 and 100 characters."
    ),

  body("description")
    .optional({ values: "falsy" })
    .trim(),

  body("location")
    .optional({ values: "falsy" })
    .trim(),

  body("project_date")
    .notEmpty()
    .withMessage("Project date is required.")
];

const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Category name must be between 3 and 100 characters."
    )
];

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.validationErrors = errors.array();
  } else {
    req.validationErrors = [];
  }

  next();
};

export {
  organizationValidation,
  projectValidation,
  categoryValidation,
  checkValidation
};