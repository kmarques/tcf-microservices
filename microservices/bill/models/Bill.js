const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");

class Bill extends Model {}

Bill.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		orderId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
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
