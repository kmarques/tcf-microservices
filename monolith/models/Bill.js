const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");

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
