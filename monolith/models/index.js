const sequelize = require("../lib/db");
const User = require("../models/User");

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  sequelize,
  User,
};
