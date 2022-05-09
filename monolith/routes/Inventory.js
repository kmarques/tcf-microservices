const Router = require("express").Router;
const InventoryController = require("../controllers/Inventory");
const router = new Router();

router.get("/:id/stock_events", InventoryController.cget);
router.get("/:id/stock", InventoryController.quantity);
router.post("/:id/stock_events", InventoryController.post);
router.delete("/:id/stock_events/:stockId", InventoryController.delete);

module.exports = router;
