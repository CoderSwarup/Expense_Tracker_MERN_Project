const express = require("express");
const morgan = require("morgan");
const UserRouter = require("./Routes/UserRoutes,js");
const cookieParser = require("cookie-parser");
const CategoryRouter = require("./Routes/CategoryRoute");
const ExpenseRouter = require("./Routes/ExpenseRoute");
const app = express();

//MiddleWare
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev")); // Use To Check Which Route is Hit And How much time Get the response to the user

// Routes
app.get("/", (req, re) => {
  console.log("request received");
  res.send("Hello Welcome Back");
});

app.use("/api/v1/auth/", UserRouter); // user Routes
app.use("/api/v1/category", CategoryRouter); // Category Routes
app.use("/api/v1/expense", ExpenseRouter); // Category Routes

// Error Handler That Stop the Server Creash If the Some Error Create at a time of Any req and res Than it Will Gives The Small Error Message
app.use(function (error, rq, res, next) {
  console.log("Error is :" + error);
  res.send(`<h1>Somthing Went Wrong Please Try After Some Time</h1>`);
});

module.exports = app;
