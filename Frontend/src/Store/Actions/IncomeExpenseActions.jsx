import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = { headers: { "Content-Type": "application/json" } };

export const GetIncomesExpenses = createAsyncThunk("users/income", async () => {
  try {
    const { data } = await axios.get(
      "/api/v1/incomeexpense/findall/incomeexpense",
      config
    );

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
