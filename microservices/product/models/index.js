const sequelize = require("../lib/db");
const Product = require("../models/Product");
const Author = require("../models/Author");
const Category = require("../models/Category");
const Editor = require("./Editor");

// Product - Category
Category.hasMany(Product);
Product.belongsTo(Category);
// Product - Author
Product.belongsToMany(Author, {
  as: "authors",
  through: "ProductAuthor",
  foreignKey: "ProductId",
});
Author.belongsToMany(Product, {
  through: "ProductAuthor",
  foreignKey: "AuthorId",
});
// Editor - Product
Editor.hasMany(Product);
Product.belongsTo(Editor);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  sequelize,
  Product,
  Author,
  Category,
  Editor,
};
