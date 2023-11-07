const express = require("express");
const {
  createExpenseController,
  UpdateExpenseController,
  DeleteExpenseController,
  FindAllExpense,
  FindExpenseOnDateFilter,
} = require("../Controllers/ExpenseController");
const { isAuthenticatedUser } = require("../Middleware/auth");

const ExpenseRouter = express.Router();

// Create Expense Router
ExpenseRouter.post(
  "/create/expense",
  isAuthenticatedUser,
  createExpenseController
);

// Update Expense
ExpenseRouter.put(
  "/update/expense/:expenseid",
  isAuthenticatedUser,
  UpdateExpenseController
);

// Delete Expense
ExpenseRouter.delete(
  "/delete/expense/:expenseid",
  isAuthenticatedUser,
  DeleteExpenseController
);

// Get all Expense
ExpenseRouter.get("/findall/expense", isAuthenticatedUser, FindAllExpense);

// Find The Expense Based On Filter  Expense
ExpenseRouter.get(
  "/findFilter/expense",
  isAuthenticatedUser,
  FindExpenseOnDateFilter
);
module.exports = ExpenseRouter;
