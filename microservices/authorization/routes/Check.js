const Router = require("express").Router;
const checkController = require("../controllers/Check");

const router = new Router();

router.post("/", checkController.check);

module.exports = router;
