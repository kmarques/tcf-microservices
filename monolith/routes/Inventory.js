const Router = require("express").Router;
const InventoryController = require("../controllers/Inventory");
const router = require("./Inventory");

router.cget("prod/:id/stock_events", InventoryController.cget);
router.iget("prod/:id/stock", InventoryController.quantity)
router.post("prod/:id/stock_events", InventoryController.post);
router.delete("prod/:id/stock_events/:stockId", InventoryController.delete);
