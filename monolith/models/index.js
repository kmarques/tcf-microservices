const sequelize = require("../lib/db");
const User = require("../models/User");
const Inventory = require("../models/Inventory");
const Payment = require("../models/Payment");
const Notification = require("../models/Notification");
const Order = require("../models/Order");
const Bill = require("../models/Bill");
const OrderProduct = require("../models/OrderProduct");
const Address = require("../models/Address");
const IAM = require("../models/IAM");
const Product = require("../models/Product");
const Author = require("../models/Author");
const Category = require("../models/Category");
const Editor = require("./Editor");

// User - Address
User.hasMany(Address, { as: "shippingAddress", foreignKey: "shipperId" });
User.hasMany(Address, { as: "billingAddress", foreignKey: "billerId" });
Address.belongsTo(User);
// User - IAM
User.hasMany(IAM);
IAM.belongsTo(User);
// Order - User
User.hasMany(Order);
Order.belongsTo(User);
// Order - Payment
Payment.belongsTo(Order);
Order.hasOne(Payment);
// Order - OrderProduct
Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Order);
// Order - Bill
Order.hasOne(Bill);
Bill.belongsTo(Order);
// Payment - Notification
Payment.hasMany(Notification);
Notification.belongsTo(Payment);
// Bill - User
User.hasMany(Bill);
Bill.belongsTo(User);
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
// OrderProduct - Product
OrderProduct.belongsTo(Product);
Product.hasMany(OrderProduct);
// Product - Inventory
Product.hasMany(Inventory);
Inventory.belongsTo(Product);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  Order,
  Bill,
  sequelize,
  User,
  Inventory,
  Product,
  Author,
  Category,
  Editor,
  Payment,
  Notification,
  OrderProduct,
  Address,
  IAM,
};
