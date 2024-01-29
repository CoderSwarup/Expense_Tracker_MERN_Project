import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import useToast from "../../Components/Common/ToastContainerComponent";

const { showToast } = useToast();
//Header Config
const config = { headers: { "Content-Type": "application/json" } };

export const RegisterUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    try {
      const { data } = await axios.post("/auth/register", userData, config);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Login User Action
export const LoginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        "/auth/login",
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
    const { data } = await axios.get("/auth/logout", config);
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
        "/auth/forgotpassword",
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

//Get User Profile
export const GetUser = createAsyncThunk("user/profile", async () => {
  try {
    const { data } = await axios.get("/auth/myprofile", config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Update profile
export const UpdateUserProfile = async (
  Data,
  dispatch,
  closemodal = () => {}
) => {
  try {
    const { data } = await axios.post(
      "/auth/update/user/profile",
      Data,
      config
    );
    showToast(data.message, "success");
    dispatch(GetUser());
    closemodal();
  } catch (error) {
    showToast(error.response.data.message, "error");
  }
};

// update Avatar
export const UpdateAvatar = async ({ avatar }, dispatch, setIsLoading) => {
  try {
    setIsLoading(true);
    const { data } = await axios.put("/auth/update/avatar", { avatar }, config);
    showToast(data.message, "success");
    dispatch(GetUser());
    setIsLoading(false);
  } catch (error) {
    showToast(error.response.data.message, "error");
    setIsLoading(false);
  }
};
