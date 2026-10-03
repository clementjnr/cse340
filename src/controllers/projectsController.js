import {
  getAllProjects,
  getProjectById,
  getProjectsByOrganizationId,
  createProject,
  updateProject,
  getProjectCategoryIds,
  updateProjectCategories
} from "../models/projects.js";

import {
  getCategoriesByProjectId,
  getAllCategories
} from "../models/categories.js";

import {
  getAllOrganizations
} from "../models/organizations.js";

const buildProjects = async (
  req,
  res,
  next
) => {
  try {
    const projects = await getAllProjects();

    res.render("service-projects", {
      title: "Service Projects",
      projects
    });
  } catch (error) {
    next(error);
  }
};

const buildProjectDetail = async (
  req,
  res,
  next
) => {
  try {
    const projectId = Number(req.params.id);

    const project =
      await getProjectById(projectId);

    if (!project) {
      return res.status(404).render("home", {
        title: "Project Not Found",
        message: "The service project could not be found."
      });
    }

    const categories =
      await getCategoriesByProjectId(projectId);

    res.render("project-detail", {
      title: project.title,
      project,
      categories
    });
  } catch (error) {
    next(error);
  }
};

const buildNewProject = async (
  req,
  res,
  next
) => {
  try {
    const organizations =
      await getAllOrganizations();

    res.render("new-project", {
      title: "New Service Project",
      organizations
    });
  } catch (error) {
    next(error);
  }
};

const createNewProject = async (req, res, next) => {
  try {
    const errors = req.validationErrors || [];

    if (errors.length > 0) {
      req.flash("error", errors[0].msg);
      return res.redirect("/new-project");
    }

    const organizationId =
      Number(req.body.organization_id);

    const title =
      req.body.title?.trim();

    const description =
      req.body.description?.trim();

    const location =
      req.body.location?.trim();

    const projectDate =
      req.body.project_date;

    await createProject(
      organizationId,
      title,
      description,
      location,
      projectDate
    );

    req.flash(
      "success",
      "Service project was successfully created."
    );

    res.redirect("/projects");
  } catch (error) {
    next(error);
  }
};

const buildEditProject = async (
  req,
  res,
  next
) => {
  try {
    const projectId =
      Number(req.params.id);

    const project =
      await getProjectById(projectId);

    if (!project) {
      req.flash(
        "error",
        "Project not found."
      );

      return res.redirect("/projects");
    }

    const organizations =
      await getAllOrganizations();

    res.render("edit-project", {
      title: "Edit Service Project",
      project,
      organizations
    });
  } catch (error) {
    next(error);
  }
};

const updateExistingProject = async (
  req,
  res,
  next
) => {
  try {
    const projectId =
      Number(req.params.id);

    const errors = req.validationErrors || [];

    if (errors.length > 0) {
      req.flash("error", errors[0].msg);

      return res.redirect(
        `/edit-project/${projectId}`
      );
    }

    const organizationId =
      Number(req.body.organization_id);

    const title =
      req.body.title?.trim();

    const description =
      req.body.description?.trim();

    const location =
      req.body.location?.trim();

    const projectDate =
      req.body.project_date;

    await updateProject(
      projectId,
      organizationId,
      title,
      description,
      location,
      projectDate
    );

    req.flash(
      "success",
      "Service project was successfully updated."
    );

    res.redirect(`/projects/${projectId}`);
  } catch (error) {
    next(error);
  }
};

const buildAssignCategories = async (
  req,
  res,
  next
) => {
  try {
    const projectId =
      Number(req.params.id);

    const project =
      await getProjectById(projectId);

    if (!project) {
      req.flash(
        "error",
        "Project not found."
      );

      return res.redirect("/projects");
    }

    const categories =
      await getAllCategories();

    const assignedCategoryIds =
      await getProjectCategoryIds(projectId);

    res.render("assign-categories", {
      title: "Assign Categories",
      project,
      categories,
      assignedCategoryIds
    });
  } catch (error) {
    next(error);
  }
};

const saveProjectCategories = async (
  req,
  res,
  next
) => {
  try {
    const projectId =
      Number(req.params.id);

    let categoryIds =
      req.body.category_ids || [];

    if (!Array.isArray(categoryIds)) {
      categoryIds = [categoryIds];
    }

    categoryIds = categoryIds
      .map(Number)
      .filter(Number.isInteger);

    await updateProjectCategories(
      projectId,
      categoryIds
    );

    req.flash(
      "success",
      "Project categories were successfully updated."
    );

    res.redirect(`/project/${projectId}`);
  } catch (error) {
    next(error);
  }
};

export {
  buildProjects,
  buildProjectDetail,
  buildNewProject,
  createNewProject,
  buildEditProject,
  updateExistingProject,
  buildAssignCategories,
  saveProjectCategories
};