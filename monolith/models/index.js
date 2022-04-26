const sequelize = require("../lib/db");
const User = require("../models/User");
const Adress = require("../models/Adress");
const IAM = require("../models/IAM");

User.hasMany(Adress, {as: "shippingAddress", foreignKey: "shipperId"});
User.hasMany(Adress, {as: "billingAddress", foreignKey: "billerId"});
Adress.belongsTo(User);

User.hasMany(IAM);
IAM.belongsTo(User);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  sequelize,
  User,
  Adress,
  IAM,
};
