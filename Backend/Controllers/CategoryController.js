const categoryModel = require("../Models/category.model");
// const moment = require("moment");

//Create Category
exports.CreateNewCategoryController = async (req, res) => {
  try {
    const { name, type } = req.body;
    const createduser = req.user._id;
    if (!name) {
      return res.status(300).send({
        success: false,
        message: "please Fill the Category Name",
      });
    }

    const CategoryAlredyExists = await categoryModel.findOne({
      name: name,
      createduser: createduser,
      type: type,
    });
    if (CategoryAlredyExists) {
      return res.status(300).send({
        success: false,
        message: "Category Already Exists",
      });
    }

    // let createTime = moment().format("hh:mm:ss");
    // let createdDate = moment().format("DD-MM-YYYY");

    // const ammountSpend = [
    //   {
    //     ammount: 8089898,
    //     createTime,
    //     createdDate,
    //   },
    // ];

    await categoryModel({ name, createduser, type }).save();
    return res.status(200).send({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "SomeThing Went Wrong in Create Category",
    });
  }
};

// Update Category

exports.UpdateCategoryController = async (req, res) => {
  try {
    const { _id } = req.params;
    const { newCategoryName, type } = req.body;

    if (!newCategoryName) {
      return res.status(300).send({
        success: false,
        message: "please Filled All Fields",
      });
    }

    const FindCategory = await categoryModel.findById(_id);
    if (!FindCategory) {
      return res.status(300).send({
        success: false,
        message: "Category is Not Available",
      });
    }

    if (newCategoryName === FindCategory.name && type === FindCategory.type) {
      return res.status(300).send({
        success: false,
        message: "Category is Same Ad Privious",
      });
    }

    await categoryModel.updateOne({ name: newCategoryName, type });

    return res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "SomeThing Went Wrong in Update Category",
    });
  }
};

// Delete Catgory
exports.DeleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.params;

    const FindCategory = await categoryModel.findById(_id);
    if (!FindCategory) {
      return res.status(402).send({
        success: false,
        message: "Category is Not Available",
      });
    }

    await categoryModel.deleteOne({ name: FindCategory.name });

    return res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "SomeThing Went Wrong in Delete Category",
    });
  }
};

// Get all Categories
exports.GetAllCategoriesController = async (req, res) => {
  try {
    let createdByUserCategory = req.user._id;
    const Categories = await categoryModel
      .find({
        createduser: createdByUserCategory,
      })
      .sort({ createdAt: -1 }); // Sort by createdAt field in descending order

    return res.status(200).send({
      success: true,
      message: "Category fetch",
      Categories,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Something Went Wrong in get Category",
    });
  }
};
