const sequelize = require("../lib/db");
const { Model, DataTypes } = require("sequelize");

class Inventory extends Model {}

Inventory.init(
  {
    typeEvent: {
      isIn: [["RESERVATION", "PURCHASE", "ADD"]],
      type: DataTypes.STRING,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Inventory" }
);

Inventory.addHook("beforeCreate", (inventory) => {
  if (
    inventory.typeEvent === "RESERVATION" ||
    inventory.typeEvent === "PURCHASE"
  ) {
    inventory.quantity = -inventory.quantity;
  }
});

module.exports = Inventory;
