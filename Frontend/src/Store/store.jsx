import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./Slices/UserSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default store;
