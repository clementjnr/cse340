import {
  getAllProjects,
  getProjectById
} from "../models/projects.js";

import {
  getCategoriesByProjectId
} from "../models/categories.js";


const buildProjects = async (req, res, next) => {
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


const buildProjectDetail = async (req, res, next) => {
  try {
    const projectId = Number(req.params.id);

    const project = await getProjectById(projectId);

    if (!project) {
      return res.status(404).render("home", {
        title: "Project Not Found",
        message: "The service project you requested could not be found."
      });
    }

    const categories = await getCategoriesByProjectId(projectId);

    res.render("project-detail", {
      title: project.title,
      project,
      categories
    });
  } catch (error) {
    next(error);
  }
};


export {
  buildProjects,
  buildProjectDetail
};