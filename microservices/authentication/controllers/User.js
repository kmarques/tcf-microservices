const { User, IAM, sequelize } = require("../models");
const { WRITE } = require("../lib/addIAM").constants;
const Sequelize = require("sequelize");
const format = require("../lib/error").formatError;
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
    const t = await sequelize.transaction();
    try {
      const user = await User.create(req.body, { transaction: t });
      await IAM.create(
        {
          resourceType: "users",
          resourceId: user.id,
          UserId: user.id,
          acl: WRITE,
        },
        { transaction: t }
      );
      await t.commit();
      res.status(201).json(user);
    } catch (err) {
      await t.rollback();
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

