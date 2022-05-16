// Restfull API for user using express router

const Router = require("express").Router;
const CategoryController = require("../controllers/Category");

const router = new Router();
router.get("/", CategoryController.cget);

router.post("/", CategoryController.post);

router.get("/:id", CategoryController.get);

router.put("/:id", CategoryController.put);

router.delete("/:id", CategoryController.delete);

module.exports = router;
