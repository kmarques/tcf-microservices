const { createToken } = require("../lib/jwt");
const bcrypt = require("bcryptjs");
const Router = require("express").Router;
const UserController = require("../controllers/User");
const { User } = require("../models");
const router = new Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      res.json({
        token: createToken(user),
      });
    } else {
      res.status(401).json({ username: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/register", UserController.post);

module.exports = router;
