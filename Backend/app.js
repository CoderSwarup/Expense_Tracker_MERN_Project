const express = require("express");
const morgan = require("morgan");
const app = express();

//MiddleWare
app.use(express.json());
app.use(morgan("dev")); // Use To Check Which Route is Hit And How much time Get the response to the user

// Routes
app.get("/", (req, res) => {
  console.log("request received");
  res.send("Hello Welcome Back");
});

module.exports = app;
