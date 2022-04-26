// ProductAuthor sequelize model defined by firstname, lastname, email, password encoded in bcrypt
//
// Language: javascript
// Path: monolith/models/ProductAuthor.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");
class ProductAuthor extends Model {}

ProductAuthor.init(
  {
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "ProductAuthor" }
);



module.exports = ProductAuthor;
