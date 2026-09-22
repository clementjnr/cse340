import {
  getAllOrganizations,
  getOrganizationById
} from "../models/organizations.js";

import {
  getProjectsByOrganizationId
} from "../models/projects.js";


const buildOrganizations = async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations
    });
  } catch (error) {
    next(error);
  }
};


const buildOrganizationDetail = async (req, res, next) => {
  try {
    const organizationId = Number(req.params.id);

    const organization = await getOrganizationById(organizationId);

    if (!organization) {
      return res.status(404).render("home", {
        title: "Organization Not Found",
        message: "The organization you requested could not be found."
      });
    }

    const projects = await getProjectsByOrganizationId(organizationId);

    res.render("organization-detail", {
      title: organization.name,
      organization,
      projects
    });
  } catch (error) {
    next(error);
  }
};


export {
  buildOrganizations,
  buildOrganizationDetail
};