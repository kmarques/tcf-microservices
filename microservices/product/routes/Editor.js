// Restfull API for user using express router

const Router = require("express").Router;
const EditorController = require("../controllers/Editor");

const router = new Router();
router.get("/", EditorController.cget);

router.post("/", EditorController.post);

router.get("/:id", EditorController.get);

router.put("/:id", EditorController.put);

router.delete("/:id", EditorController.delete);

module.exports = router;
