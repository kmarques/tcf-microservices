const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db.js");

class Order extends Model {}

Order.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		shippingAddress: {
			type: DataTypes.STRING,
			allowNull: false
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: "created"
		},
	},
	{ sequelize, modelName: "Order" }
);

module.exports = Order;
