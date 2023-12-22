import { configureStore } from "@reduxjs/toolkit";
import { ForgotPasswordReducer, UserReducer } from "./Slices/UserSlice";
import { IncomeExpesneReducer } from "./Slices/IncomeExpenseSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    forgotpassword: ForgotPasswordReducer,
    incomeexpense: IncomeExpesneReducer,
  },
});

export default store;
