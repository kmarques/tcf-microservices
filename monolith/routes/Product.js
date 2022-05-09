// Restfull API for user using express router

const Router = require("express").Router;
const ProductController = require("../controllers/Product");

const router = new Router();
router.get("/", ProductController.cget);

router.post("/", ProductController.post);

router.get("/:id", ProductController.get);

router.put("/:id", ProductController.put);

router.delete("/:id", ProductController.delete);

router.use("/", require("./Inventory"));

module.exports = router;
