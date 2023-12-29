import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const config = { headers: { "Content-Type": "application/json" } };

// get  Categories
const GetCategoryList = createAsyncThunk("user/income-category", async () => {
  try {
    const response = await axios.get("/api/v1/category/getall/category");
    const data = await response;
    return data?.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export { GetCategoryList };
