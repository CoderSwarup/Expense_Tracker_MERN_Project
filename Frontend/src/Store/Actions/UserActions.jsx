import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login User
export const LoginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
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
      console.log("eee");
      throw new Error(error.response.data.message);
    }
  }
);
