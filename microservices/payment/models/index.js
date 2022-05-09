const Payment = require("../models/Payment");
const Notification = require("../models/Notification");
const sequelize = require("../lib/db");

// Payment - Notification
Payment.hasMany(Notification);
Notification.belongsTo(Payment);

module.exports = {
    Payment,
    Notification,
    sequelize
};