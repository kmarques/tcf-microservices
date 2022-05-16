// Category sequelize model defined by firstname, lastname, email, password encoded in bcrypt
//
// Language: javascript
// Path: monolith/models/Category.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");
class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Category" }
);



module.exports = Category;
