const sequelize = require("../lib/db");
const User = require("../models/User");
const Product = require("../models/Product");
const Author = require("../models/Author");
const Category = require("../models/Category");
const ProductAuthor = require("../models/ProductAuthor");
const Editor = require("./Editor");

Category.hasMany(Product);
Product.belongsTo(Category);

ProductAuthor.hasMany(Author);
Author.belongsTo(ProductAuthor);
ProductAuthor.hasMany(Product);
Product.belongsTo(ProductAuthor);
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
};
