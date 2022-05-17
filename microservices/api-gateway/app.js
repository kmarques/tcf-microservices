const express = require("express");
const Discovery = require("./utils/Discovery");
const app = express();
app.use(express.json());

Discovery(app);
//app.use(require("./routes/security"));
//app.use(require("./routes/user"));

module.exports = app;
