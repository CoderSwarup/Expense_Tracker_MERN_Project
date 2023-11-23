const app = require("./app");
require("dotenv").config();
const DBConnection = require("./db/DBConnection.js");
const cloudinary = require("cloudinary");

//Database Connection
DBConnection();

//Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Server Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is Running On Port Number ${PORT}`);
});
