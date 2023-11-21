import { configureStore } from "@reduxjs/toolkit";
import { ForgotPasswordReducer, UserReducer } from "./Slices/UserSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    forgotpassword: ForgotPasswordReducer,
  },
});

export default store;
