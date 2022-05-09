const { Model, DataTypes } = require("sequelize");
const { iamRights } = require("../utils/constants");
const sequelize = require("../lib/db");

class IAM extends Model {}

IAM.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    resourceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resourceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acl: {
      type: DataTypes.SMALLINT,
      validate: { isIn: [Object.values(iamRights)] },
      allowNull: false,
    },
  },
  { sequelize, modelName: "IAM" }
);

module.exports = IAM;

// TODO : create index on userId and resourceType and resourceId