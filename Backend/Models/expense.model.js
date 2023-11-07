const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createddate: {
      type: Date,
    },
    amount: {
      type: Number,
      required: [true, "Please Enter Amount for Expense"],
    },
    desc: {
      type: String,
      required: [true, "Please Enter Description for Expense"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    createduser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
