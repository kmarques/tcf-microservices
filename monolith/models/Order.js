const { Model, DataTypes } = require("sequelize");
const User = require("./User");
const sequelize = require("../lib/db");

class Order extends Model {}

Order.init(
	{
		shippingAdress: {
			type: DataTypes.STRING,
			allowNull: false
		},
		FactureId: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		}
	},
	{ sequelize, modelName: "Order" }
);

module.exports = Order;
