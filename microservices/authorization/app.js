const dotenv = require("dotenv");
[".env", ".env.local"].forEach((path) => dotenv.config({ path }));

const express = require("express");
const app = express();

app.use(express.json());

app.use("/", require("./routes/Check"));
app.use("/iam", require("./routes/IAM"));
app.use("/role", require("./routes/Role"));

module.exports = app;
