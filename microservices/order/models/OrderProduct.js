const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db.js");

class OrderProduct extends Model {}

OrderProduct.init(
	{
		productId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
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
