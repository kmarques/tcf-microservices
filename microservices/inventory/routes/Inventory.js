const Router = require("express").Router;
const InventoryController = require("../controllers/Inventory");
const router = new Router();

router.get("/stock_events", InventoryController.cget);
router.get("/products/:id/stock", InventoryController.quantity);
router.post("/stock_events", InventoryController.post);
router.delete("/stock_events/:stockId", InventoryController.delete);


module.exports = router;
