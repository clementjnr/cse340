import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import flash from "connect-flash";

import indexRoutes from "./routes/index.js";
import organizationRoutes from "./routes/organizationRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "cse340-secret",
    resave: false,
    saveUninitialized: false
  })
);

// Flash messages
app.use(flash());

// Make flash messages available to every EJS view
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", indexRoutes);

app.use("/organizations", organizationRoutes);
app.use("/organization", organizationRoutes);

app.use("/projects", projectRoutes);
app.use("/project", projectRoutes);
app.use("/service-projects", projectRoutes);

app.use("/categories", categoryRoutes);
app.use("/category", categoryRoutes);

// Create/edit routes
app.use("/", adminRoutes);

// 404
app.use((req, res) => {
  res.status(404).render("home", {
    title: "Page Not Found",
    message: "The page you requested could not be found."
  });
});

// 500
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