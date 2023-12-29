// filter category function

export const FilterCategory = (categorylist, type) => {
  if (type == "Expense" || type === "Income") {
    const filterCategory = categorylist.filter((cat) => cat.type === type);
    return filterCategory;
  } else {
    throw new Error("Categoy is wrong");
  }
};
