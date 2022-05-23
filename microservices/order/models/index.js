const Order = require("./Order");
const OrderProduct = require("./OrderProduct");
const Sequelize = require("../lib/db");

Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Order);

module.exports = {
  Order,
  OrderProduct,
  Sequelize,
};
