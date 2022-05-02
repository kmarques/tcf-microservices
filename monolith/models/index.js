const sequelize = require("../lib/db");
const User = require("../models/User");
const Product = require("../models/Product");
const Author = require("../models/Author");
const Category = require("../models/Category");
const Editor = require("./Editor");
const ProductAuthor = sequelize.define('ProductAuthor')


Category.hasMany(Product);
Product.belongsTo(Category);

Product.belongsToMany(Author, {
  through: "ProductAuthor",
  foreignKey: "ProductId",
});
Author.belongsToMany(Product, {
  through: "ProductAuthor",
  foreignKey: "AuthorId",
});

Editor.hasMany(Product);
Product.belongsTo(Editor);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  sequelize,
  User,
  Product,
  Author,
  Category,
  Editor,
  ProductAuthor,
};
