const dotenv = require("dotenv");
[".env", ".env.local"].forEach((path) => dotenv.config({ path }));

const express = require("express");
const app = express();

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use("/payment", require("./routes/payment"));


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT);
});

module.exports = app;
