const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");

class Address extends Model {}

Address.init(
  {
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressString: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, modelName: "Address" }
);

module.exports = Address;
