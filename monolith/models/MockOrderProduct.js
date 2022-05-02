const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");

class MockOrderProduct extends Model {}

MockOrderProduct.init(
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
  { sequelize, modelName: "MockOrderProduct" }
);

module.exports = MockOrderProduct;
