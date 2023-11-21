import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Header Config
const config = { headers: { "Content-Type": "application/json" } };

// Login User Action
export const LoginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/auth/login",
        {
          email,
          password,
        },
        config
      );

      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Logout User Actions
export const LogoutUser = createAsyncThunk("user/logout", async () => {
  try {
    const { data } = await axios.get("/api/v1/auth/logout", config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

//Forgot Password

export const ForgotPassword = createAsyncThunk(
  "user/password/forgot",
  async ({ email }) => {
    try {
      const { data } = await axios.post(
        "/api/v1/auth/forgotpassword",
        {
          email,
        },
        config
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const GetUser = createAsyncThunk("user/profile", async () => {
  try {
    const { data } = await axios.get("/api/v1/auth/myprofile", config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
