import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useToast from "../../Components/Common/ToastContainerComponent";
const config = { headers: { "Content-Type": "application/json" } };

const { showToast } = useToast();
// get  Categories
export const GetCategoryList = createAsyncThunk(
  "user/incomeExpense-category",
  async () => {
    try {
      const response = await axios.get("/category/getall/category");
      const data = await response;
      return data?.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const CreateNewCategory = async (Data, Dispatch) => {
  try {
    const { data } = await axios.post(
      "/category/create/category",
      Data,
      config
    );
    // console.log(data);
    showToast("Category is Created", "success");
    Dispatch(GetCategoryList());
  } catch (error) {
    showToast(error.response.data.message, "error");
  }
};

// Delet Category
export const DeleteCategory = async (
  categoryid,
  Dispatch,
  closeModal = () => {}
) => {
  try {
    const { data } = await axios.delete(
      `/category/delete/category/${categoryid}`,
      config
    );
    // console.log(data);
    showToast("Category is Deleted", "success");
    Dispatch(GetCategoryList());
    closeModal();
  } catch (error) {
    showToast(error.response.data.message, "error");
  }
};

export const UpdateCategory = async (
  categoryid,
  Data,
  Dispatch,
  closeModal = () => {}
) => {
  try {
    const { data } = await axios.put(
      `/category/update/category/${categoryid}`,
      Data,
      config
    );
    // console.log(data);
    showToast("Category is Updated", "success");
    Dispatch(GetCategoryList());
    closeModal();
  } catch (error) {
    showToast(error.response.data.message, "error");
  }
};
