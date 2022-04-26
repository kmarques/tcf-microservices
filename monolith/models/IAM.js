const { Model, DataTypes } = require("sequelize");
const { constants } = require("../lib/addIAM");
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
    acl: {
      type: DataTypes.TINYINT,
      validate: {isIn: [Object.values(constants)]},
      allowNull: false
    }
  },
  { sequelize, modelName: "IAM" }
);

module.exports = IAM;
