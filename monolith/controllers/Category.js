const { Category } = require("../models");

module.exports = {
  cget: async (req, res) => {
    console.log("Get category collections");
    try {
      const categorys = await Category.findAll({ where: req.query });
      res.json(categorys);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  post: async (req, res) => {
    try {
      const category = await Category.create(req.body);
      res.status(201).json(category);
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
      const category = await Category.findByPk(req.params.id);
      res.json(category);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  put: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      await category.update(req.body);
      res.json(category);
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
      const category = await Category.findByPk(req.params.id);
      await category.destroy();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
