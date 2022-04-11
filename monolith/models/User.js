const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");
const bcrypt = require("bcryptjs");

class User extends Model {}

User.init(
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billingAddress: { type: DataTypes.ARRAY(DataTypes.STRING) },
    shippingAddress: { type: DataTypes.ARRAY(DataTypes.STRING) },
    role: { 
      type: DataTypes.STRING,
      defaultValue: "customer" },
  },
  { sequelize, modelName: "User" }
);

User.addHook("beforeCreate", (user) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
});

User.addHook("beforeUpdate", (user) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
});

module.exports = User;
