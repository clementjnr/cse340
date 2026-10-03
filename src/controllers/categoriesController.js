import {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId,
  createCategory,
  updateCategory
} from "../models/categories.js";

import {
  getProjectsByCategoryId
} from "../models/projects.js";

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

    const category =
      await getCategoryById(categoryId);

    if (!category) {
      return res.status(404).render("home", {
        title: "Category Not Found",
        message: "The category could not be found."
      });
    }

    const projects =
      await getProjectsByCategoryId(categoryId);

    res.render("category-detail", {
      title: category.name,
      category,
      projects
    });
  } catch (error) {
    next(error);
  }
};

const buildNewCategory = async (req, res) => {
  res.render("new-category", {
    title: "New Category"
  });
};

const createNewCategory = async (req, res, next) => {
  try {
    const errors = req.validationErrors || [];

    if (errors.length > 0) {
      req.flash("error", errors[0].msg);
      return res.redirect("/new-category");
    }

    const name =
      req.body.name?.trim();

    await createCategory(name);

    req.flash(
      "success",
      "Category was successfully created."
    );

    res.redirect("/categories");
  } catch (error) {
    next(error);
  }
};

const buildEditCategory = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);

    const category =
      await getCategoryById(categoryId);

    if (!category) {
      req.flash("error", "Category not found.");
      return res.redirect("/categories");
    }

    res.render("edit-category", {
      title: "Edit Category",
      category
    });
  } catch (error) {
    next(error);
  }
};

const updateExistingCategory = async (
  req,
  res,
  next
) => {
  try {
    const categoryId =
      Number(req.params.id);

    const errors = req.validationErrors || [];

    if (errors.length > 0) {
      req.flash("error", errors[0].msg);

      return res.redirect(
        `/edit-category/${categoryId}`
      );
    }

    const name =
      req.body.name?.trim();

    await updateCategory(
      categoryId,
      name
    );

    req.flash(
      "success",
      "Category was successfully updated."
    );

    res.redirect(`/categories/${categoryId}`);
  } catch (error) {
    next(error);
  }
};

export {
  buildCategories,
  buildCategoryDetail,
  buildNewCategory,
  createNewCategory,
  buildEditCategory,
  updateExistingCategory
};