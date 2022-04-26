// Restfull API for user using express router

const Router = require("express").Router;
const BillController = require("../controllers/Bill");

const router = new Router();

router.get("/", BillController.cget);

router.post("/", BillController.post);

router.get("/:id", BillController.get);

// router.put("/:id", BillController.put);

// router.delete("/:id", BillController.delete);

module.exports = router;
