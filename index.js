const express = require("express");
const monk = require("monk");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/admin", (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // console.log(process.env);
  console.log("test kudoness heroku");
});
