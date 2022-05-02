const { User } = require("../models");

module.exports = {
  cget: async (req, res) => {
    console.log("Get user collections");
    try {
      const users = await User.findAll({ where: req.query });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  post: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        res.status(400).json(format(err));
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  },

  get: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  put: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      await user.update(req.body);
      res.json(user);
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        res.status(400).json(format(err));
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  },

  delete: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      await user.destroy();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

