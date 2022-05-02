const { Editor } = require("../models");

module.exports = {
  cget: async (req, res) => {
    console.log("Get editor collections");
    try {
      const editors = await Editor.findAll({ where: req.query });
      res.json(editors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  post: async (req, res) => {
    try {
      const editor = await Editor.create(req.body);
      res.status(201).json(editor);
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
      const editor = await Editor.findByPk(req.params.id);
      res.json(editor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  put: async (req, res) => {
    try {
      const editor = await Editor.findByPk(req.params.id);
      await editor.update(req.body);
      res.json(editor);
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
      const editor = await Editor.findByPk(req.params.id);
      await editor.destroy();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
