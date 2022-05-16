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

app.use(
  "/products",
  // require("./middlewares/authentication"),
  require("./routes/Product")
);
app.use(
  "/categories",
  // require("./middlewares/authentication"),
  require("./routes/Category")
);
app.use(
  "/authors",
  // require("./middlewares/authentication"),
  require("./routes/Author")
);
app.use(
  "/editors",
  // require("./middlewares/authentication"),
  require("./routes/Editor")
);


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT);
});
