import {
  getAllUsers
} from "../models/users.js";


const buildUsers = async (
  req,
  res,
  next
) => {
  try {
    const users = await getAllUsers();

    res.render("users", {
      title: "Registered Users",
      users
    });
  } catch (error) {
    next(error);
  }
};


export {
  buildUsers
};