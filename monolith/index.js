require("dotenv").config();
const express = require("express");
const { Category, Author, Editor } = require("./models");
const app = express();
console.log(process.env);
app.use(express.json());

app.use("/", require("./routes/security"));
app.use("/users", require("./middlewares/security"), require("./routes/User"));
app.use("/products", require("./middlewares/security"), require("./routes/Product"));
// app.use("/authors", require("./middlewares/security"), require("./routes/Author"));
// app.use("/editors", require("./middlewares/security"), require("./routes/Editor"));
// app.use("/category", require("./middlewares/security"), require("./routes/Category"));
app.use("/test/products", async (req, res) => {
  await Category.create(
    {
      name: "cat",
    },
  );
  await Category.create(
    {
      name: "cat2",
    },
  );
  await Author.create(
    {
      name: "auth",
      biography: "biog",
      imageUrl: "test",
    }
  )
  await Author.create(
    {
      name: "auth2",
      biography: "biog2",
      imageUrl: "test2",
    }
  )
  await Editor.create(
    {
      name: "edit",
      imageUrl: "test",
    }
  )
  await Editor.create(
    {
      name: "edit2",
      imageUrl: "test2",
    }
  )
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + process.env.PORT);
});
