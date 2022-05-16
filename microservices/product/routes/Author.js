// Restfull API for user using express router

const Router = require("express").Router;
const AuthorController = require("../controllers/Author");

const router = new Router();
router.get("/", AuthorController.cget);

router.post("/", AuthorController.post);

router.get("/:id", AuthorController.get);

router.put("/:id", AuthorController.put);

router.delete("/:id", AuthorController.delete);

module.exports = router;
