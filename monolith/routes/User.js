// Restfull API for user using express router

const Router = require("express").Router;
const UserController = require("../controllers/User");
const authentication = require("../middlewares/authentication");
const roleAuthorization = require("../middlewares/authorization");

const router = new Router();
router.get("/", authentication, roleAuthorization({role : 'admin'}), UserController.cget);

router.post("/", authentication, UserController.post);

router.get("/:id", authentication, UserController.get);

router.put("/:id", authentication, UserController.put);

router.delete("/:id", authentication, UserController.delete);

module.exports = router;
