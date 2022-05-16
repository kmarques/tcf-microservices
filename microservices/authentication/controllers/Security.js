const { createToken } = require("../lib/jwt");
const bcrypt = require("bcryptjs");
const { User } = require("../models");


module.exports = {
  post: async (req, res) => {
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
  },
};
