const express = require("express");
const {
  RegisterUserController,
  LoginUserController,
  LogoutUserController,
  ForgotPasswordController,
  ResetPasswordController,
  GetUserDeatils,
  UpdatePasswordController,
  UpdateProfileController,
  VerifyUserController,
} = require("../Controllers/UserController");
const { isAuthenticatedUser } = require("../Middleware/auth");
const UserRouter = express.Router();

// Register User Route
UserRouter.route("/register").post(RegisterUserController);

//Verify User Route
UserRouter.put("/verify/user/:token", VerifyUserController);

//Login User
UserRouter.post("/login", LoginUserController);

//Logout
UserRouter.route("/logout").get(isAuthenticatedUser, LogoutUserController);

//Forgot Password Controller
UserRouter.post("/forgotpassword", ForgotPasswordController);

//Reset Password Route
UserRouter.put("/password/reset/:token", ResetPasswordController);

// User Details Route
UserRouter.get("/myprofile", isAuthenticatedUser, GetUserDeatils);

//Update Password Route
UserRouter.put(
  "/password/update",
  isAuthenticatedUser,
  UpdatePasswordController
);

// Update Profile
UserRouter.post(
  "/update/user/profile",
  isAuthenticatedUser,
  UpdateProfileController
);
module.exports = UserRouter;
