import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useToast from "../../Components/Common/ToastContainerComponent";

const config = { headers: { "Content-Type": "application/json" } };

const { showToast } = useToast();
export const GetIncomesExpenses = createAsyncThunk(
  "transaction/get",
  async () => {
    try {
      const { data } = await axios.get(
        "/incomeexpense/findall/incomeexpense",
        config
      );

      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

//Create Transaction
export const CreateNewTransaction = async (
  Data,
  CloseModel = () => {},
  dispatch
) => {
  try {
    const { data } = await axios.post(
      "/incomeexpense/create/incomeexpesne",
      Data,
      config
    );
    // console.log(data);
    showToast("Transaction Created Successfully", "success");
    CloseModel();
    dispatch(GetIncomesExpenses());
  } catch (error) {
    // console.log(error);
    showToast(error.response.data.message, "error");
  }
};

export const DeleteTranSaction = async (
  expenseID,
  dispatch,
  CloseModals = () => {}
) => {
  try {
    const { data } = await axios.delete(
      `/incomeexpense/delete/expense/${expenseID}`,
      config
    );

    showToast("Transaction Deleted Successfully", "success");
    CloseModals();
    dispatch(GetIncomesExpenses());
  } catch (error) {
    showToast(error.response.data.message, "error");
  }
};
export const UpdateTransaction = async (
  expenseID,
  Data,
  dispatch,
  CloseModals = () => {}
) => {
  try {
    const { data } = await axios.put(
      `/incomeexpense/update/expense/${expenseID}`,
      Data,
      config
    );

    showToast("Transaction Updated Successfully", "success");
    CloseModals();
    dispatch(GetIncomesExpenses());
  } catch (error) {
    showToast(error.response.data.message, "error");
  }
};
