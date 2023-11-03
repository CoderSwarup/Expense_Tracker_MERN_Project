const express = require("express");
const { isAuthenticatedUser } = require("../Middleware/auth");
const {
  CreateNewCategoryController,
  UpdateCategoryController,
  DeleteCategoryController,
  GetAllCategoriesController,
} = require("../Controllers/CategoryController");
const CategoryRouter = express.Router();

// Create New Category Router
CategoryRouter.post(
  "/create/category",
  isAuthenticatedUser,
  CreateNewCategoryController
);

// Update Category Router
CategoryRouter.put(
  "/update/category/:_id",
  isAuthenticatedUser,
  UpdateCategoryController
);

// Delete Category

CategoryRouter.delete(
  "/delete/category/:_id",
  isAuthenticatedUser,
  DeleteCategoryController
);

// Get all categories
CategoryRouter.get(
  "/getall/category",
  isAuthenticatedUser,
  GetAllCategoriesController
);

module.exports = CategoryRouter;
