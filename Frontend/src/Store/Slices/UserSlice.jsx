import { createSlice } from "@reduxjs/toolkit";
import { LoginUser } from "../Actions/UserActions";

// Login Register And Logout
const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loading: false,
    isAuthenticated: false,
    error: null,
    message: null,
  },

  reducers: {
    clearMessage: (state) => ({
      ...state,
      message: null,
    }),
    clearError: (state) => ({
      ...state,
      error: null,
    }),
  },
  extraReducers: (builder) => {
    // Handle both LoginUser and RegisterUser actions

    // // login / register
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.user = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export const { clearMessage, clearError } = UserSlice.actions;
export const { reducer: UserReducer } = UserSlice;
