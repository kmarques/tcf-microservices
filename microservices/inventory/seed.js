require("dotenv").config();

const { Inventory } = require("./models");
(async () => {
  await Inventory.create({
    orderId: 1,
    productId: 12,
    typeEvent: "ADD",
    quantity: 12,

    
  }), await Inventory.create({
    orderId: 2,
    productId: 11,
    typeEvent: "PURCHASE",
    quantity: 2,

    
  }), await Inventory.create({
    orderId: 3,
    productId: 11,
    typeEvent: "PURCHASE",
    quantity: 2,

    
  });


})();
