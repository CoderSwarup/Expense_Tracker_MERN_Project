const categoryModel = require("../Models/category.model");

const UpdateCategoryTotalAmount = async (categoryId) => {
  try {
    const category = await categoryModel
      .findOne({ _id: categoryId })
      .populate("ammountSpend.expense")
      .exec();

    if (category) {
      const totalAmountSpend = category.ammountSpend.reduce((total, item) => {
        return total + +item.expense.amount;
      }, 0);

      category.totalAmountSpend = totalAmountSpend;

      // Save the updated Category document using await

      await category.save();
      console.log(category);
    }
  } catch (error) {
    console.error(error);
    // Handle any errors here
  }
};

module.exports = UpdateCategoryTotalAmount;
