const { Model, DataTypes } = require("sequelize");
const { roles } = require("../utils/constants");
const sequelize = require("../lib/db");

class Role extends Model {}

Role.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      validate: { isIn: [Object.values(roles)] },
      allowNull: false,
    },
  },
  { sequelize, modelName: "Role" }
);

module.exports = Role;
