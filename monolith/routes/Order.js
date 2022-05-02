// Restfull API for user using express router

const Router = require("express").Router;
const OrderController = require("../controllers/Order");

const router = new Router();

router.get("/", OrderController.cget);

router.post("/", OrderController.post);

router.get("/:id", OrderController.get);

// router.put("/:id", OrderController.put);

// router.delete("/:id", OrderController.delete);

module.exports = router;
