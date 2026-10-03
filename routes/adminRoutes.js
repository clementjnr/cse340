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

const router = express.Router();

// Organizations

router.get(
  "/new-organization",
  buildNewOrganization
);

router.post(
  "/new-organization",
  organizationValidation,
  checkValidation,
  createNewOrganization
);

router.get(
  "/edit-organization/:id",
  buildEditOrganization
);

router.post(
  "/edit-organization/:id",
  organizationValidation,
  checkValidation,
  updateExistingOrganization
);

// Projects

router.get(
  "/new-project",
  buildNewProject
);

router.post(
  "/new-project",
  projectValidation,
  checkValidation,
  createNewProject
);

router.get(
  "/edit-project/:id",
  buildEditProject
);

router.post(
  "/edit-project/:id",
  projectValidation,
  checkValidation,
  updateExistingProject
);

// Project category assignment

router.get(
  "/assign-categories/:id",
  buildAssignCategories
);

router.post(
  "/assign-categories/:id",
  saveProjectCategories
);

// Categories

router.get(
  "/new-category",
  buildNewCategory
);

router.post(
  "/new-category",
  categoryValidation,
  checkValidation,
  createNewCategory
);

router.get(
  "/edit-category/:id",
  buildEditCategory
);

router.post(
  "/edit-category/:id",
  categoryValidation,
  checkValidation,
  updateExistingCategory
);

export default router;