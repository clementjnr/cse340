import express from "express";


import {
  buildNewOrganization,
  createNewOrganization,
  buildEditOrganization,
  updateExistingOrganization
} from "../src/controllers/organizationsController.js";


import {
  buildNewProject,
  createNewProject,
  buildEditProject,
  updateExistingProject,
  buildAssignCategories,
  saveProjectCategories
} from "../src/controllers/projectsController.js";


import {
  buildNewCategory,
  createNewCategory,
  buildEditCategory,
  updateExistingCategory
} from "../src/controllers/categoriesController.js";


import {
  organizationValidation,
  projectValidation,
  categoryValidation,
  checkValidation
} from "../src/validators/adminValidators.js";


import {
  requireRole
} from "../src/middleware/auth.js";


const router = express.Router();


// ======================================================
// ORGANIZATIONS
// ======================================================

router.get(
  "/new-organization",
  requireRole("admin"),
  buildNewOrganization
);


router.post(
  "/new-organization",
  requireRole("admin"),
  organizationValidation,
  checkValidation,
  createNewOrganization
);


router.get(
  "/edit-organization/:id",
  requireRole("admin"),
  buildEditOrganization
);


router.post(
  "/edit-organization/:id",
  requireRole("admin"),
  organizationValidation,
  checkValidation,
  updateExistingOrganization
);


// ======================================================
// PROJECTS
// ======================================================

router.get(
  "/new-project",
  requireRole("admin"),
  buildNewProject
);


router.post(
  "/new-project",
  requireRole("admin"),
  projectValidation,
  checkValidation,
  createNewProject
);


router.get(
  "/edit-project/:id",
  requireRole("admin"),
  buildEditProject
);


router.post(
  "/edit-project/:id",
  requireRole("admin"),
  projectValidation,
  checkValidation,
  updateExistingProject
);


// ======================================================
// PROJECT CATEGORIES
// ======================================================

router.get(
  "/assign-categories/:id",
  requireRole("admin"),
  buildAssignCategories
);


router.post(
  "/assign-categories/:id",
  requireRole("admin"),
  saveProjectCategories
);


// ======================================================
// CATEGORIES
// ======================================================

router.get(
  "/new-category",
  requireRole("admin"),
  buildNewCategory
);


router.post(
  "/new-category",
  requireRole("admin"),
  categoryValidation,
  checkValidation,
  createNewCategory
);


router.get(
  "/edit-category/:id",
  requireRole("admin"),
  buildEditCategory
);


router.post(
  "/edit-category/:id",
  requireRole("admin"),
  categoryValidation,
  checkValidation,
  updateExistingCategory
);


export default router;