const sequelize = require("../lib/db");

const Inventory = require("../models/Inventory");






sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  sequelize,
  Inventory,
  
};
