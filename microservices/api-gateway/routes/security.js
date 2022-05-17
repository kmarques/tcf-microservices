const Router = require("express").Router;
const fetch = require("node-fetch");
const forwardRequest = require("../middlewares/forwardRequest");
const verifyToken = require("../middlewares/verifyToken");
const router = new Router();

router.post("/login", forwardRequest(process.env.AUTHENTICATION_URL));
router.post("/register", forwardRequest(process.env.AUTHENTICATION_URL));

router.get("/test", verifyToken, (req, res) => {
  console.log(req.user);
  res.sendStatus(200);
});

module.exports = router;
