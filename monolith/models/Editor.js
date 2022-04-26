// Editor sequelize model defined by firstname, lastname, email, password encoded in bcrypt
//
// Language: javascript
// Path: monolith/models/Editor.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/db");

class Editor extends Model {}

Editor.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
  //  unique: true,
    },
    
  },
  { sequelize, modelName: "Editor" }
);



module.exports = Editor;
