import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import indexRoutes from "./routes/index.js";
import organizationRoutes from "./routes/organizationRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);

app.use("/organizations", organizationRoutes);

app.use("/projects", projectRoutes);

app.use("/project", projectRoutes);

app.use("/service-projects", projectRoutes);

app.use("/categories", categoryRoutes);

app.use("/category", categoryRoutes);

app.use((req, res) => {
  res.status(404).render("home", {
    title: "Page Not Found",
    message: "The page you requested could not be found."
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).render("home", {
    title: "Server Error",
    message: "Sorry, something went wrong on the server."
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});