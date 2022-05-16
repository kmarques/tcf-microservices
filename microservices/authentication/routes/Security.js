const Router = require("express").Router;
const UserController = require("../controllers/User");
const SecurityController = require("../controllers/Security");
const { verifyToken } = require("../lib/jwt")
const router = new Router();

router.post("/login", SecurityController.post);

router.post("/register", UserController.post);

router.post("/verify-token", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) {
    res.sendStatus(401);
  } else {
    try {
      const [type, token] = auth.split(/\s+/);
      if (type !== "Bearer") throw new Error();
      const decoded = await verifyToken(token);
      res.json(decoded);
    } catch (err) {
      res.sendStatus(401);
    }
  }
});

module.exports = router;
