const app = require("./app");
require("dotenv").config();
const DBConnection = require("./db/DBConnection.js");

DBConnection();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is Running On Port Number ${PORT}`);
});
