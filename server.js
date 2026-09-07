import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRoutes);

app.use((req, res) => {
  res.status(404).render("home", {
    title: "Page Not Found",
    message: "The page you requested could not be found."
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
