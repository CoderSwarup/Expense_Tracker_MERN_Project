const express = require("express");

const { isAuthenticatedUser } = require("../Middleware/auth");
const {
  FindIncomeExpenseOnDateFilter,
  FindAllIncomeExpense,
  createIncomeExpenseController,
  UpdateIncomeExpenseController,
  DeleteIncomeExpenseController,
} = require("../Controllers/IncomeExpenseController");

const IncomeExpenseRouter = express.Router();

// Create Expense Router
IncomeExpenseRouter.post(
  "/create/incomeexpesne",
  isAuthenticatedUser,
  createIncomeExpenseController
);

// Update Expense
IncomeExpenseRouter.put(
  "/update/expense/:expenseid",
  isAuthenticatedUser,
  UpdateIncomeExpenseController
);

// Delete Expense
IncomeExpenseRouter.delete(
  "/delete/expense/:expenseid",
  isAuthenticatedUser,
  DeleteIncomeExpenseController
);

// Get all Expense
IncomeExpenseRouter.get(
  "/findall/incomeexpense",
  isAuthenticatedUser,
  FindAllIncomeExpense
);

// Find The Expense Based On Filter  Expense
IncomeExpenseRouter.get(
  "/findFilter/expense",
  isAuthenticatedUser,
  FindIncomeExpenseOnDateFilter
);
module.exports = IncomeExpenseRouter;
