const { Model, DataTypes } = require("sequelize");
const User = require("./User");
const sequelize = require("../lib/db");
const Order = require("./Order");

class Bill extends Model {}

Bill.init(
	{
		Path: {
			type: DataTypes.STRING,
			allowNull: false
		},
		ExpiredAt: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		BillingAddress: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{ sequelize, modelName: "Bill" }
);

module.exports = Bill;
