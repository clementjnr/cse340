import { getProjectsByVolunteerId } from "../models/projects.js";

const buildDashboard = async (req, res, next) => {
  try {
    const volunteeredProjects = await getProjectsByVolunteerId(
      req.session.user.user_id
    );

    res.render("dashboard", {
      title: "Dashboard",
      volunteeredProjects
    });
  } catch (error) {
    next(error);
  }
};

export { buildDashboard };
