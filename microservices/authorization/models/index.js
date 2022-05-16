const sequelize = require("../lib/db");
const IAM = require("./IAM");
const Role = require("./Role");

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  sequelize,
  Role,
  IAM,
};
