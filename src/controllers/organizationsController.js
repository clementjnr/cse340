import {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization
} from "../models/organizations.js";

import { getProjectsByOrganizationId } from "../models/projects.js";

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

    const organization =
      await getOrganizationById(organizationId);

    if (!organization) {
      return res.status(404).render("home", {
        title: "Organization Not Found",
        message: "The organization could not be found."
      });
    }

    const projects =
      await getProjectsByOrganizationId(organizationId);

    res.render("organization-detail", {
      title: organization.name,
      organization,
      projects
    });
  } catch (error) {
    next(error);
  }
};

const buildNewOrganization = async (req, res) => {
  res.render("new-organization", {
    title: "New Organization"
  });
};

const createNewOrganization = async (req, res, next) => {
  try {
    const name = req.body.name?.trim();
    const description = req.body.description?.trim();
    const location = req.body.location?.trim();

    if (!name) {
      req.flash("error", "Organization name is required.");
      return res.redirect("/new-organization");
    }

    if (name.length < 3 || name.length > 100) {
      req.flash(
        "error",
        "Organization name must be between 3 and 100 characters."
      );

      return res.redirect("/new-organization");
    }

    await createOrganization(
      name,
      description,
      location
    );

    req.flash(
      "success",
      "Organization was successfully created."
    );

    res.redirect("/organizations");
  } catch (error) {
    next(error);
  }
};

const buildEditOrganization = async (req, res, next) => {
  try {
    const organizationId = Number(req.params.id);

    const organization =
      await getOrganizationById(organizationId);

    if (!organization) {
      req.flash("error", "Organization not found.");
      return res.redirect("/organizations");
    }

    res.render("edit-organization", {
      title: "Edit Organization",
      organization
    });
  } catch (error) {
    next(error);
  }
};

const updateExistingOrganization = async (
  req,
  res,
  next
) => {
  try {
    const organizationId = Number(req.params.id);

    const name = req.body.name?.trim();
    const description = req.body.description?.trim();
    const location = req.body.location?.trim();

    if (!name) {
      req.flash("error", "Organization name is required.");
      return res.redirect(
        `/edit-organization/${organizationId}`
      );
    }

    if (name.length < 3 || name.length > 100) {
      req.flash(
        "error",
        "Organization name must be between 3 and 100 characters."
      );

      return res.redirect(
        `/edit-organization/${organizationId}`
      );
    }

    await updateOrganization(
      organizationId,
      name,
      description,
      location
    );

    req.flash(
      "success",
      "Organization was successfully updated."
    );

    res.redirect(`/organization/${organizationId}`);
  } catch (error) {
    next(error);
  }
};

export {
  buildOrganizations,
  buildOrganizationDetail,
  buildNewOrganization,
  createNewOrganization,
  buildEditOrganization,
  updateExistingOrganization
};