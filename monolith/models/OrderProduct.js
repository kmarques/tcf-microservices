const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");

class OrderProduct extends Model {}

OrderProduct.init(
	{
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		unitPrice: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{ sequelize, modelName: "OrderProduct" }
);

module.exports = OrderProduct;
