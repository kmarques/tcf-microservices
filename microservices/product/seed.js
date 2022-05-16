require("dotenv").config();

const { Category, Author, Editor } = require("./models");
(async () => {
  await Category.create({
    name: "cat",
  });
  await Category.create({
    name: "cat2",
  });
  await Author.create({
    name: "auth",
    biography: "biog",
    imageUrl: "test",
  });
  await Author.create({
    name: "auth2",
    biography: "biog2",
    imageUrl: "test2",
  });
  await Editor.create({
    name: "edit",
    imageUrl: "test",
  });
  await Editor.create({
    name: "edit2",
    imageUrl: "test2",
  });
})();
