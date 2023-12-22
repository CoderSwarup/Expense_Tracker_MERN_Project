import { createSlice } from "@reduxjs/toolkit";
import { GetIncomesExpenses } from "../Actions/IncomeExpenseActions";

//Income Reducer
const IncomeExpenseSlice = createSlice({
  name: "incomeexpese",
  initialState: {
    incomeexpenseslist: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetIncomesExpenses.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(GetIncomesExpenses.fulfilled, (state, action) => {
        state.incomeexpenseslist = action.payload.data;
        state.loading = false;
      })
      .addCase(GetIncomesExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reducer: IncomeExpesneReducer } = IncomeExpenseSlice;
