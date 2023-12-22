const express = require("express");
const morgan = require("morgan");
const UserRouter = require("./Routes/UserRoutes.js");
const cookieParser = require("cookie-parser");
const CategoryRouter = require("./Routes/CategoryRoute");
const app = express();
const bodyParser = require("body-parser");
const IncomeExpenseRouter = require("./Routes/IncomeExpenseRoute");
//MiddleWare

// Increase the limit to handle larger payloads
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev")); // Use To Check Which Route is Hit And How much time Get the response to the user

// Routes
app.get("/", (req, res) => {
  console.log("request received");
  res.send("Hello Welcome Back");
});

app.use("/api/v1/auth/", UserRouter); // user Routes
app.use("/api/v1/category", CategoryRouter); // Category Routes
app.use("/api/v1/incomeexpense", IncomeExpenseRouter); // Category Routes

// Error Handler That Stop the Server Creash If the Some Error Create at a time of Any req and res Than it Will Gives The Small Error Message
app.use(function (error, rq, res, next) {
  console.log("Error is :" + error);
  res.status(300).send({
    success: false,
    error:
      "Please Try To Contact Us Somthing Went Wrong Please Try After Some Time",
  });
});

module.exports = app;
