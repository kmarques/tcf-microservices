const { formatError } = require("../lib/error");
const { Role } = require("../models");
const Sequelize = require("sequelize");

module.exports = {
  post: async (req, res) => {
    try {
      const role = await Role.create({
        userId: req.headers["x-user-id"],
        ...req.body,
      });
      res.status(201).json(role);
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        res.status(400).json(formatError(err));
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  },

  get: async (req, res) => {
    try {
      const role = await Role.findByPk(req.params.id);
      if (role) {
        res.json(role);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  put: async (req, res) => {
    try {
      const role = await Role.findByPk(req.params.id);
      await role.update(req.body);
      if (role) {
        res.json(role);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        res.status(400).json(formatError(err));
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  },

  delete: async (req, res) => {
    try {
      const role = await Role.findByPk(req.params.id);
      if (role) {
        await role.destroy();
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
