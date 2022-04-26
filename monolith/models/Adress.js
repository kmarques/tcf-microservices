const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");

class Adress extends Model {}

Adress.init(
  {
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adressString: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, modelName: "Adress" }
);

module.exports = Adress;
