const sequelize = require("../lib/db");
const User = require("../models/User");
const Address = require("../models/Address");
const IAM = require("../models/IAM");

User.hasMany(Address, {as: "shippingAddress", foreignKey: "shipperId"});
User.hasMany(Address, {as: "billingAddress", foreignKey: "billerId"});
Address.belongsTo(User);

User.hasMany(IAM);
IAM.belongsTo(User);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  sequelize,
  User,
  Address,
  IAM,
};
