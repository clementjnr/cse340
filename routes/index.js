import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
    message: "Welcome to our Community Service Directory."
  });
});

router.get("/organizations", (req, res) => {
  res.render("organizations", {
    title: "Organizations"
  });
});

router.get("/service-projects", (req, res) => {
  res.render("service-projects", {
    title: "Service Projects"
  });
});

router.get("/categories", (req, res) => {
  res.render("categories", {
    title: "Categories"
  });
});

export default router;
