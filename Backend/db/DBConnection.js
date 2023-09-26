const mongoose = require("mongoose");

const DBConnection = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connection Successful");
    })
    .catch((err) => {
      console.log("error : " + err);
    });
};

module.exports = DBConnection;
