const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");

class IAM extends Model {}

IAM.init(
  {
    resourceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resourceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "IAM" }
);

module.exports = IAM;
