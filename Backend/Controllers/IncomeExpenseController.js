const moment = require("moment");
const CategoryExpenseService = require("../utils/CategoryExpenseService");
const IncomeExpense = require("../Models/incomeexpense.model");

const SendErrorResponse = (res, code, message) => {
  return res.status(code).send({ success: false, message });
};

// Create a new expense
exports.createIncomeExpenseController = async (req, res) => {
  try {
    const { name, createddate, amount, desc, category } = req.body;
    const createduser = req.user._id;
    // console.log(req.user._id);

    let date;

    if (!name) {
      SendErrorResponse(res, 400, "Please enter the name of the expense");
    }

    if (amount < 0) {
      SendErrorResponse(res, 400, "Amount cannot be negative");
    }

    if (!desc) {
      SendErrorResponse(res, 400, "Description is required");
    }

    if (!category) {
      SendErrorResponse(res, 400, "Category is required");
    }

    if (!createddate) {
      date = new Date();
    } else {
      const validDateFormat = /^\d{4}-\d{2}-\d{2}$/;

      if (!validDateFormat.test(createddate)) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format in query parameters",
        });
      }
      date = createddate;
    }

    if (!createduser) {
      SendErrorResponse(res, 401, "Unauthorized");
    }

    await CategoryExpenseService.CreateExpenseAndAddInCatrgory(
      name,
      date,
      amount,
      desc,
      category,
      createduser
    );

    return res.status(201).send({
      success: true,
      mesage: "Expense Created Sussfully",
    });
  } catch (error) {
    // console.log(error);
    if (error instanceof Error) {
      return SendErrorResponse(res, 500, error.message);
    }
    return res
      .status(500)
      .json({ error: "An error occurred while creating the expense." });
  }
};

// Update Expense
exports.UpdateIncomeExpenseController = async (req, res) => {
  try {
    // Extract request parameters and data
    let expenseid = req.params.expenseid;
    const { name, createddate, amount, desc, category } = req.body;
    const createduser = req.user._id;
    let date;

    if (!name) {
      SendErrorResponse(res, 400, "Please enter the name of the expense");
    }

    if (amount < 0) {
      SendErrorResponse(res, 400, "Amount cannot be negative");
    }

    if (!desc) {
      SendErrorResponse(res, 400, "Description is required");
    }

    if (!category) {
      SendErrorResponse(res, 400, "Category is required");
    }

    if (!createduser) {
      SendErrorResponse(res, 401, "Unauthorized");
    }

    await CategoryExpenseService.UpdateExpenseAndupdateCategory(
      expenseid,
      createduser,
      name,
      createddate,
      amount,
      desc,
      category
    );
    // If all conditions are met, return a success response
    return res.status(200).send({
      success: true,
      message: "Expense Successfully updated",
    });
  } catch (error) {
    if (error instanceof Error) {
      return SendErrorResponse(res, 501, error.message);
    }
    // Handle unexpected errors and return an error response
    SendErrorResponse(res, 500, "Something went Wrong in Update Expense");
  }
};

//Delete Expense
exports.DeleteIncomeExpenseController = async (req, res) => {
  try {
    const expenseId = req.params.expenseid;
    const createduser = req.user._id;

    if (!expenseId) {
      return SendErrorResponse(res, 400, "Expense Id is Required");
    }

    if (!createduser) {
      return SendErrorResponse(res, 401, "Unauthorized");
    }

    await CategoryExpenseService.DeleteExpenseAndRemoveFromCategory(
      expenseId,
      createduser
    );

    return res.status(200).send({
      success: true,
      message: "Expense Deleted Succesfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return SendErrorResponse(res, 501, error.message);
    }
    // Handle unexpected errors and return an error response
    return SendErrorResponse(
      res,
      500,
      "Something Went Wrong in Delete Expense "
    );
  }
};

// FindAll Expenses
exports.FindAllIncomeExpense = async (req, res) => {
  try {
    const createduser = req.user._id;

    if (!createduser) {
      return SendErrorResponse(res, 401, "Unauthorized");
    }

    const FindExpense = await IncomeExpense.find({
      createduser: createduser,
    }).populate("category", "name type");

    return res.status(200).send({
      success: true,
      message: "All Expense",
      data: FindExpense,
    });
  } catch (error) {
    return SendErrorResponse(
      res,
      500,
      "Something Went Wrong in Fetch all Expense "
    );
  }
};

exports.FindIncomeExpenseOnDateFilter = async (req, res) => {
  try {
    const createduser = req.user._id;
    const dategte = req.query.dategte || req.query.dategt;
    let datelte = req.query.datelte || req.query.datelt;

    // Check if the query parameters match valid date/time formats
    const validDateFormat = /^\d{4}-\d{2}-\d{2}$/;

    if (!validDateFormat.test(dategte) || !validDateFormat.test(datelte)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format in query parameters",
      });
    }

    // If the date formats are valid, you can proceed to filter results
    datelte += "T23:59:59.999Z";
    const expenses = await IncomeExpense.find({
      createduser,
      $and: [
        { createddate: { $gte: new Date(dategte) } },
        { createddate: { $lte: new Date(datelte) } },
      ],
    });

    // console.log(new Date(expenses[0].createddate), new Date("04-14-2023"));
    return res.status(200).send({
      message: "Expense",
    });
  } catch (error) {
    console.log(error);
    return SendErrorResponse(res, 500, "Something Went Wrong In Date Filter");
  }
};
