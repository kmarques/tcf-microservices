const dotenv = require("dotenv");
[".env", ".env.local"].forEach((path) => dotenv.config({ path }));

const express = require("express");
const app = express();

app.use(
  express.json()
);

app.use("/", require("./routes/Check"));
app.use("/iam", require("./routes/IAM"));
app.use("/role", require("./routes/Role"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT);
});

