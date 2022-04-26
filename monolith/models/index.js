const sequelize = require("../lib/db");
const User = require("../models/User");
const Order = require("../models/Order");
const Bill = require("../models/Bill");
const OrderProduct = require("../models/OrderProduct");

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Bill);
Bill.belongsTo(User);

Order.hasOne(Bill);
Bill.belongsTo(Order);

OrderProduct.hasMany(Order);
Order.belongsTo(OrderProduct);

sequelize.sync({ alter: true }).then(() => {
	console.log("Database & tables created!");
});

module.exports = {
	sequelize,
	User
};
