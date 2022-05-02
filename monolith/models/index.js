const sequelize = require("../lib/db");
const User = require("../models/User");
const Inventory = require("../models/Inventory");
const Product = require("../models/ProductMock");

Product.hasMany(Inventory);
Inventory.belongsTo(Product);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  sequelize,
  User,
  Inventory: require("../models/Inventory")
};
