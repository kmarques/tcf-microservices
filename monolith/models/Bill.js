const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");

class Bill extends Model {}

Bill.init(
	{
		path: {
			type: DataTypes.STRING,
			allowNull: false
		},
		expiredAt: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "10y"
		},
		billingAddress: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{ sequelize, modelName: "Bill" }
);

module.exports = Bill;
