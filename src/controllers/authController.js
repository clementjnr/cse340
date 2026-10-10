import bcrypt from "bcrypt";

import {
  getUserByEmail,
  createUser
} from "../models/users.js";


const buildRegister = (req, res) => {
  res.render("register", {
    title: "Register"
  });
};


const registerUser = async (req, res, next) => {
  try {
    const errors = req.validationErrors || [];

    if (errors.length > 0) {
      req.flash("error", errors[0].msg);
      return res.redirect("/register");
    }

    const name = req.body.name.trim();
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      req.flash(
        "error",
        "An account with that email already exists."
      );

      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await createUser(
      name,
      email,
      hashedPassword,
      "user"
    );

    req.flash(
      "success",
      "Registration successful. You can now log in."
    );

    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};


const buildLogin = (req, res) => {
  res.render("login", {
    title: "Login"
  });
};


const loginUser = async (req, res, next) => {
  try {
    const errors = req.validationErrors || [];

    if (errors.length > 0) {
      req.flash("error", errors[0].msg);
      return res.redirect("/login");
    }

    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;

    const user = await getUserByEmail(email);

    if (!user) {
      req.flash(
        "error",
        "Invalid email or password."
      );

      return res.redirect("/login");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      req.flash(
        "error",
        "Invalid email or password."
      );

      return res.redirect("/login");
    }

    req.session.user = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    req.flash(
      "success",
      `Welcome back, ${user.name}!`
    );

    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
};


const logoutUser = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }

    res.redirect("/");
  });
};


export {
  buildRegister,
  registerUser,
  buildLogin,
  loginUser,
  logoutUser
};