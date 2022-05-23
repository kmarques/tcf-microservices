const dotenv = require("dotenv");
[".env", ".env.local"].forEach((path) => dotenv.config({ path }));

const express = require("express");
const { sequelize } = require("./models");
const app = express();

app.use(express.json());

console.log("hey");
app.use("/", require("./routes/Security"));
app.use("/users", require("./routes/User"));

module.exports = app;
