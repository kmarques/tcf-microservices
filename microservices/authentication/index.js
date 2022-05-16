const dotenv = require("dotenv");
[".env", ".env.local"].forEach((path) => dotenv.config({ path }));

const express = require("express");
const app = express();

app.use(
  express.json()
);

app.use("/", require("./routes/Security"));
app.use("/users", require("./routes/User"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT);
});

