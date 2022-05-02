const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");

class Payment extends Model {}

Payment.init(
  {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentIntentId: DataTypes.STRING,
  },
  { sequelize, modelName: "Payment" }
);

module.exports = Payment;
