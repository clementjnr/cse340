import express from "express";

const router = express.Router();


router.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
    message: "Welcome to our Community Service Directory."
  });
});


export default router;
