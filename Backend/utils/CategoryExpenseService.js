const categoryModel = require("../Models/category.model");
const IncomeExpense = require("../Models/incomeexpense.model");
// const UpdateCategoryTotalAmount = require("./CategoryTotalAmountHelper");
class CategoryExpenseService {
  static async CreateExpenseAndAddInCatrgory(
    name,
    date,
    amount,
    desc,
    category,
    createduser
  ) {
    try {
      const Category = await categoryModel.findOne({
        _id: category,
        createduser: createduser,
      });
      if (!Category) {
        throw new Error("Category not found for the expense.");
      }
      // Create a new Expense document
      const newExpense = new IncomeExpense({
        name,
        createddate: date,
        amount,
        desc,
        category,
        createduser,
      });

      // Save the expense to the database
      const createdExpense = await newExpense.save();

      Category.ammountSpend.push({ expense: createdExpense._id });
      Category.totalAmountSpend += +amount;
      await Category.save();

      // await UpdateCategoryTotalAmount(category);
    } catch (error) {
      throw error;
    }
  }

  static async DeleteExpenseAndRemoveFromCategory(expenseId, createduser) {
    try {
      const deletedExpense = await IncomeExpense.findOne({
        _id: expenseId,
        createduser: createduser,
      });

      if (!deletedExpense) {
        throw new Error("No Such Expense Found");
      }

      // Find the respective category
      const category = await categoryModel.findOne({
        _id: deletedExpense.category,
        createduser: createduser,
      });

      if (!category) {
        throw new Error("Category not found for the expense.");
      }

      // Update the totalAmountSpend
      category.totalAmountSpend -= deletedExpense.amount;

      // Remove the expense from the ammountSpend array

      await category.updateOne({
        $pull: {
          ammountSpend: {
            expense: expenseId, // The specific value to match and remove
          },
        },
      });

      // Save the updated category
      await deletedExpense.deleteOne({
        _id: expenseId,
      });
      await category.save();

      // // Delete the expense
    } catch (error) {
      throw error;
    }
  }

  static async UpdateExpenseAndupdateCategory(
    expenseid,
    createduser,
    name,
    date,
    amount,
    desc,
    category
  ) {
    try {
      const UpdatedExpense = await IncomeExpense.findOne({
        _id: expenseid,
        createduser,
      });

      if (!UpdatedExpense) {
        throw new Error("No such expense found for Update");
      }

      const FindCategory = await categoryModel.findOne({
        _id: UpdatedExpense.category,
        createduser,
      });

      if (!FindCategory) {
        throw new Error("No such Catgory Found for This expense");
      }

      if (!amount || UpdatedExpense.amount === +amount) {
        await UpdatedExpense.updateOne({
          name,
          createddate: date,
          amount,
          desc,
          category,
          createduser,
        });
        return;
      }

      FindCategory.totalAmountSpend -= UpdatedExpense.amount;
      FindCategory.totalAmountSpend += amount;

      await UpdatedExpense.updateOne({
        name,
        createddate: date,
        amount,
        desc,
        category,
        createduser,
      });

      await FindCategory.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoryExpenseService;
