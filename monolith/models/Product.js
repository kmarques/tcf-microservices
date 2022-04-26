// Product sequelize model defined by firstname, lastname, email, password encoded in bcrypt
//
// Language: javascript
// Path: monolith/models/Product.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");
const bcrypt = require("bcryptjs");

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  { sequelize, modelName: "Product" }
);

module.exports = Product;
