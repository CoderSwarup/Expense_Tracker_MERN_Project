const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    ammountSpend: [
      {
        expense: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Expense",
        },
      },
    ],
    totalAmountSpend: {
      type: Number,
      default: 0,
    },
    createduser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the Category model
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
