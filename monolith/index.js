require("dotenv").config();
const express = require("express");
const app = express();
console.log(process.env);
app.use(express.json({verify: (req,res,buf) => { req.rawBody = buf }}));

app.use("/", require("./routes/security"));
app.use('/payment', require('./routes/payment'));
app.use("/users", require("./middlewares/authentication"), require("./routes/User"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT);
});
