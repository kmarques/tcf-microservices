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

module.exports = app;