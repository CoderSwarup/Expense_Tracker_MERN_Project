import { createSlice } from "@reduxjs/toolkit";
import { GetCategoryList } from "../Actions/CategoryActions";

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    categoryList: [],

    isLoading: false,
    error: null,
    message: null,
  },
  extraReducers: (builder) => {
    // categoru
    builder
      .addCase(GetCategoryList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetCategoryList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload.Categories;
        state.message = action.payload.message;
      })
      .addCase(GetCategoryList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: CategoryReducer } = CategorySlice;
