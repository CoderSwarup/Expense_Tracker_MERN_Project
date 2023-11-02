const userModel = require("../Models/user.model");
const bcrypt = require("bcrypt");
const TokenSender = require("../utils/TokenSender");
const { errorMonitor } = require("nodemailer/lib/xoauth2");
const { SendEmail } = require("../utils/sendEmail");

//Register User
exports.RegisterUserController = async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;

    if ((!name, !email, !password, !cpassword)) {
      return res
        .status(401)
        .send({ succcess: false, message: "Please fill all fields" });
    }

    if (password !== cpassword) {
      return res
        .status(401)
        .send({ succcess: false, message: "Password Must Be Match!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    userModel({
      name,
      email,
      password: hashPassword,
      avatar: {
        public_id: "33838",
        url: "sjssjsj",
      },
    })
      .save()
      .then(() => {
        res.status(200).send({
          succcess: true,
          message: "User Register Successfully Please Verify Email",
        });
      });
  } catch (error) {
    res.status(400).send({
      succcess: false,
      message: "Error in Register User",
    });
  }
};

//Login User

exports.LoginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .send({ success: false, message: "Email or Password is not valid" });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .send({ succcess: false, message: "Email or Password is not valid" });
    }

    if (!user.isValidUser) {
      return res
        .status(401)
        .send({ succcess: false, message: "Your A Not a Verifyed User" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(401)
        .send({ succcess: false, message: "Email or Password is not valid" });
    }

    TokenSender(user, 200, "Login Succefully!", res);
    // res.status(200).send({
    //   succcess: true,
    //   message: "Login Succefully!",
    // });
  } catch (error) {
    console.log(errorMonitor);
    res.status(400).send({
      succcess: false,
      message: "Error in Login User",
    });
  }
};

//Logout User
exports.LogoutUserController = async (req, res) => {
  try {
    res
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .cookie("refreshToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .status(200)
      .send({
        success: true,
        message: "logout Successfully",
      });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in Logout",
    });
  }
};

//Forgot password
exports.ForgotPasswordController = async (req, res) => {
  const { email } = req.body;

  if (!email || email === "") {
    return res.status(401).send({
      success: false,
      message: "Please Fill The Proper Deatils",
    });
  }

  const user = await userModel.findOne({ email });
  try {
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Please Check Your Email Email is Not Valid",
      });
    }

    // get Reset Pasword Token
    let resetToken = user.generatePasswordResetToken();

    await user.save({ validateBeforeSave: false });

    //genarate on frontend Url
    // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const resetPasswordUrl = `http://extracker.com/password/reset/${resetToken}`;

    const message = `Your Reset Password Token is  == \n\n  ${resetPasswordUrl} \n\n if You Have Not requested this Email then , Please Error `;

    let EmailSend = await SendEmail(
      {
        email: user.email,
        subject: `SamEcom Password Recovery`,
        message,
      },
      res
    );
    if (EmailSend) {
      res.status(200).send({
        success: true,
        message: `Email is Send TO ${user.email}`,
      });
    }
  } catch (error) {
    console.log(error);
    if (user) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpired = undefined;
      await user.save({ validateBeforeSave: false });
    }
    return res.status(400).send({
      success: false,
      message: "Somthing Went Wrong in Forgot Password",
    });
  }
};

//Reset Password Controller
exports.ResetPasswordController = async (req, res) => {
  try {
    const resetToken = req.params.token;

    if (req.body.password !== req.body.cpassword) {
      throw ErrorHandler.customError("Password Not Matched", 404);
    }

    const user = await userModel.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpired: { $gt: new Date(Date.now()) },
    });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Sorry Try Again Password Token Is Expired!!",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;

    await user.save();
    sendToken(user, 200, "Password Changed Succefully", res);
  } catch (error) {
    // console.log(error);
    return res.status(400).send({
      success: false,
      message: "Somthing Went Wrong in Reset Password",
    });
  }
};

// User Deatils Controller
exports.GetUserDeatils = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User Not Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Welcome Back To Our Website",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      succcess: false,
      message: "Somthing Went Wrong in Getting user Details",
    });
  }
};

// Update Passwrd Controller
exports.UpdatePasswordController = async (req, res) => {
  try {
    const { oldpassword, newPassword, confirmpassword } = req.body;
    if (!oldpassword || !newPassword || !confirmpassword) {
      return res.status(500).send({
        status: false,
        message: "All Fields Are Required",
      });
    }

    if (newPassword !== confirmpassword) {
      return res.status(400).send({
        succcess: false,
        message: "Please Match The New Password",
      });
    }
    const user = await userModel.findById(req.user._id).select("password");

    if (!user) {
      return res
        .status(401)
        .send({ succcess: false, message: "Email or Password is not valid" });
    }

    const MatchOldPassword = await bcrypt.compare(oldpassword, user.password);

    if (!MatchOldPassword) {
      return res.status(500).send({
        status: false,
        message: "Sorry Old Password Is Not Matched",
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await user.updateOne({
      password: hashPassword,
    });

    return res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    // console.log(error);
    return res.status(401).send({
      status: false,
      message: "Error in UpdatePassword Controller",
    });
  }
};

// Update Profile Controller
exports.UpdateProfileController = async (req, res) => {
  try {
    let NewUserData = {
      name: req.body.name,
      // email: req.body.email,
    };

    if (!NewUserData.name) {
      return res.status(401).send({
        status: false,
        message: "Required All fileds",
      });
    }

    // Update Cloudinary Images
    // if (req.body.avatar !== "") {
    //   const user = await usersModel.findById(req.user.id);

    //   const imageId = user.avatar.public_id;

    //   await cloudinary.v2.uploader.destroy(imageId);

    //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "samecomm",
    //     width: 150,
    //     crop: "scale",
    //   });

    //   NewUserData.avatar = {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //   };
    // }

    const user = await userModel.findByIdAndUpdate(req.user._id, NewUserData, {
      new: true,
    });

    if (!user) {
      res.status(400).send({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Profile Updated Succefully",
    });
  } catch (error) {
    return res.status(401).send({
      status: false,
      message: "Error in Update Profile",
    });
  }
};
