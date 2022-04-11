// Restfull API for user using express router

const Router = require("express").Router;
const UserController = require("../controllers/User");

const router = new Router();
router.get("/", UserController.cget);

router.post("/", UserController.post);

router.get("/:id", UserController.get);

router.put("/:id", UserController.put);

router.delete("/:id", UserController.delete);

module.exports = router;
