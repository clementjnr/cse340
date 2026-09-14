import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { getAllOrganizations } from "./src/models/organizations.js";
import { getAllProjects } from "./src/models/projects.js";
import { getAllCategories } from "./src/models/categories.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home", {
    title: "Home"
  });
});

app.get("/organizations", async (req, res) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations
    });
  } catch (error) {
    console.error("Error retrieving organizations:", error);

    res.status(500).render("home", {
      title: "Database Error",
      message: "Unable to retrieve organizations."
    });
  }
});

app.get("/service-projects", async (req, res) => {
  try {
    const projects = await getAllProjects();

    res.render("service-projects", {
      title: "Service Projects",
      projects
    });
  } catch (error) {
    console.error("Error retrieving service projects:", error);

    res.status(500).render("home", {
      title: "Database Error",
      message: "Unable to retrieve service projects."
    });
  }
});

/*
 * This /projects route is included as an alias because the
 * W02 team activity refers to views/projects.ejs.
 * Your actual page remains service-projects.ejs.
 */
app.get("/projects", async (req, res) => {
  try {
    const projects = await getAllProjects();

    res.render("service-projects", {
      title: "Service Projects",
      projects
    });
  } catch (error) {
    console.error("Error retrieving projects:", error);

    res.status(500).render("home", {
      title: "Database Error",
      message: "Unable to retrieve projects."
    });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.render("categories", {
      title: "Categories",
      categories
    });
  } catch (error) {
    console.error("Error retrieving categories:", error);

    res.status(500).render("home", {
      title: "Database Error",
      message: "Unable to retrieve categories."
    });
  }
});

app.use((req, res) => {
  res.status(404).render("home", {
    title: "Page Not Found",
    message: "The page you requested could not be found."
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
