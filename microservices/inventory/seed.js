require("dotenv").config();

const { Inventory } = require("./models");
(async () => {
  await Inventory.create({
    orderId: 1,
    ProductId: 12,
    typeEvent: "ADD",
    quantity: 12,

    
  }), await Inventory.create({
    orderId: 2,
    ProductId: 11,
    typeEvent: "PURCHASE",
    quantity: 2,

    
  }), await Inventory.create({
    orderId: 3,
    ProductId: 11,
    typeEvent: "PURCHASE",
    quantity: 2,

    
  });


})();
