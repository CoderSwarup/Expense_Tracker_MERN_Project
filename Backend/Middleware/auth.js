const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
const userModel = require("../Models/user.model");

dotenv.config();

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log(token);

    if (!token || token == undefined) {
      return res.status(401).send({
        success: false,
        message: "Please Login to access This resource",
      });
    }

    const DecodedToken = await JWT.verify(token, process.env.JWT_SECRET);

    if (!DecodedToken) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized User!!!!",
      });
    }
    req.user = await userModel.findById(DecodedToken._id);
    next();
  } catch (error) {
    if (error instanceof JWT.JsonWebTokenError) {
      return res.status(400).send({
        success: false,
        message: "UnAuthorized User!!!!",
      });
    }
    if (error instanceof JWT.TokenExpiredError) {
      return res.status(404).send({
        success: false,
        message: "Token Expired. Please Login",
      });
    } else {
      console.log(error);
      return res.status(500).send({
        success: false,
        error: "Internal Server Error",
      });
    }
  }
};

// Check user is admin or not
