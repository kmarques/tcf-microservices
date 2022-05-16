const sequelize = require("../lib/db");
const {Model, DataTypes} = require("sequelize");

class Product extends Model {}

Product.init(
    {   
    
    },
    { sequelize, modelName: "Product" }
)

module.export = Product;