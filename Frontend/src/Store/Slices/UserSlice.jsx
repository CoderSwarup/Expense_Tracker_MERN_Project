import { createSlice } from "@reduxjs/toolkit";
import {
  ForgotPassword,
  GetUser,
  LoginUser,
  LogoutUser,
  RegisterUser,
} from "../Actions/UserActions";

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

    //Register User
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });

    // // login
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

    //Logout
    builder
      .addCase(LogoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LogoutUser.fulfilled, (state, action) => {
        state.user = {};
        state.isAuthenticated = false;
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //GetUser
    builder
      .addCase(GetUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.message = null;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.user = {};
        state.loading = false;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { clearMessage, clearError } = UserSlice.actions;
export const { reducer: UserReducer } = UserSlice;

//Forgot Password Slice
const ForgotPasswordSlice = createSlice({
  name: "ForgotPassword",
  initialState: {
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    forgotclearError: (state) => ({
      ...state,
      error: null,
    }),
    forgotclearMessage: (state) => ({
      ...state,
      message: null,
    }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(ForgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(ForgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(ForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { forgotclearError, forgotclearMessage } =
  ForgotPasswordSlice.actions;

export const { reducer: ForgotPasswordReducer } = ForgotPasswordSlice;
