import { configureStore } from "@reduxjs/toolkit";
import { ForgotPasswordReducer, UserReducer } from "./Slices/UserSlice";
import { IncomeExpesneReducer } from "./Slices/IncomeExpenseSlice";
import { CategoryReducer } from "./Slices/CategorySlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    forgotpassword: ForgotPasswordReducer,
    incomeexpense: IncomeExpesneReducer,
    category: CategoryReducer,
  },
});

export default store;
