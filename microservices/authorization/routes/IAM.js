const Router = require("express").Router;
const iamController = require("../controllers/IAM");

const router = new Router();

router.post("/", iamController.post);
router.get("/:id", iamController.get);
router.put("/:id", iamController.put);
router.delete("/:id", iamController.delete);

module.exports = router;
