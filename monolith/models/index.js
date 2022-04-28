const sequelize = require("../lib/db");
const User = require("../models/User");
const Payment = require('../models/Payment');
const Notification = require('../models/Notification');
const MockOrderProduct = require('../models/MockOrderProduct')

Payment.hasMany(Notification);
Notification.belongsTo(Payment);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
});

module.exports = {
  sequelize,
  User,
  Payment,
  Notification,
  MockOrderProduct
};
