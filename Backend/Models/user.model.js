const mongoose = require("mongoose");
const dotenv = require("dotenv");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
dotenv.config();
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [30],
      minLength: [4, "minmum name Cahrater Length 4"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //   validate: [validator.isEmail, "Please Eneter a Valid Email"],
    },
    password: {
      type: String,
      // required: true,
      select: false,
    },
    mobile: {
      type: Number,
      // required: true,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    isValidUser: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpired: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//jwt token
UserSchema.methods.getJWTToken = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

//Refresh token
UserSchema.methods.generateRefreshToken = function () {
  return JWT.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

//reset pasword Method
UserSchema.methods.generatePasswordResetToken = function () {
  try {
    // this resettoken genarate the random value
    let resetToken = crypto.randomBytes(20).toString("hex");
    // console.log(resetToken);

    //hashing and adding to user schema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.resetPasswordExpired = new Date(Date.now() + 15 * 60 * 1000);

    // console.log(this.resetPasswordToken.length);
    return this.resetPasswordToken;
  } catch (error) {
    console.log("error", error);
  }
};

const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;
