const Payment = require("../models/Payment");
const Notification = require("../models/Notification");

// Payment - Notification
Payment.hasMany(Notification);
Notification.belongsTo(Payment);

module.exports = {
    Payment,
    Notification
  };