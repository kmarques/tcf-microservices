const Router = require("express").Router;
const roleController = require("../controllers/Role");

const router = new Router();

router.post("/", roleController.post);
router.get("/:id", roleController.get);
router.put("/:id", roleController.put);
router.delete("/:id", roleController.delete);

module.exports = router;
