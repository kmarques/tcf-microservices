const sequelize = require("../lib/db");
const User = require("../models/User");
const Payment = require('../models/Payment');
const Notification = require('../models/Notification');
const Order = require("../models/Order");
const Bill = require("../models/Bill");
const OrderProduct = require("../models/OrderProduct");
const Address = require("../models/Address");
const IAM = require("../models/IAM");
const Product = require("../models/Product");
const Author = require("../models/Author");
const Category = require("../models/Category");
const Editor = require("./Editor");

Payment.hasMany(Notification);
Notification.belongsTo(Payment);

User.hasMany(Address, {as: "shippingAddress", foreignKey: "shipperId"});
User.hasMany(Address, {as: "billingAddress", foreignKey: "billerId"});
Address.belongsTo(User);

User.hasMany(IAM);
IAM.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Bill);
Bill.belongsTo(User);

Order.hasOne(Bill);
Bill.belongsTo(Order);

Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Order);
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
	Order,
	Bill,
  sequelize,
  User,
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
