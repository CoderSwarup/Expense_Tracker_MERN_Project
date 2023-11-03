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
        ammount: {
          type: Number,
          default: 123333,
        },
        createTime: {
          type: String,
        },
        createdDate: {
          type: String,
        },
      },
    ],
    totalAmountSpend: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
