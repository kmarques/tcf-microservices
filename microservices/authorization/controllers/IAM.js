const { IAM } = require("../models");
const Sequelize = require("sequelize");
const { formatError } = require("../lib/error");

module.exports = {
  post: async (req, res) => {
    try {
      const iam = await IAM.create({
        userId: req.headers["x-user-id"],
        ...req.body,
      });
      res.status(201).json(iam);
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
      const iam = await IAM.findByPk(req.params.id);
      if (iam) {
        res.json(iam);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  put: async (req, res) => {
    try {
      const iam = await IAM.findByPk(req.params.id);
      await iam.update(req.body);
      if (iam) {
        res.json(iam);
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
      const iam = await IAM.findByPk(req.params.id);
      await iam.destroy();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
