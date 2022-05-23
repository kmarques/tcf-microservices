const sequelize = require("../lib/db");
const IAM = require("./IAM");
const Role = require("./Role");

module.exports = {
  sequelize,
  Role,
  IAM,
};
