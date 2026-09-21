import {
  getAllCategories,
  getCategoryById
} from "../models/categories.js";

import { getProjectsByCategoryId } from "../models/projects.js";


const buildCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    res.render("categories", {
      title: "Categories",
      categories
    });
  } catch (error) {
    next(error);
  }
};


const buildCategoryDetail = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);

    const category = await getCategoryById(categoryId);

    if (!category) {
      return res.status(404).render("home", {
        title: "Category Not Found",
        message: "The category you requested could not be found."
      });
    }

    const projects = await getProjectsByCategoryId(categoryId);

    res.render("category-detail", {
      title: category.name,
      category,
      projects
    });
  } catch (error) {
    next(error);
  }
};


export {
  buildCategories,
  buildCategoryDetail
};