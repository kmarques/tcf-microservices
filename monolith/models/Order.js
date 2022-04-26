const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");

class Order extends Model {}

Order.init(
	{
		shippingAddress: {
			type: DataTypes.STRING,
			allowNull: false
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "created"
		},
	},
	{ sequelize, modelName: "Order" }
);

module.exports = Order;
