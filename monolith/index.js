require("dotenv").config();
const express = require("express");
const app = express();
console.log(process.env);
app.use(express.json());

app.use("/", require("./routes/security"));
app.use("/users", require("./routes/User"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT);
});
