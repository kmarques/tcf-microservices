// Author sequelize model defined by firstname, lastname, email, password encoded in bcrypt
//
// Language: javascript
// Path: monolith/models/Author.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");
const bcrypt = require("bcryptjs");

class Author extends Model {}

Author.init(
  {
    biography: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  { sequelize, modelName: "Author" }
);
module.exports = Author;
