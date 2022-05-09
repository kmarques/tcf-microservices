const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");

class Notification extends Model {}

Notification.init(
  {
    body: {
      type: DataTypes.JSON,
    }
  },
  { sequelize, modelName: "Notification" }
);

module.exports = Notification;
