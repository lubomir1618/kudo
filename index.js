const express = require("express");
const monk = require("monk");
const cors = require("cors");
const app = express();

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
