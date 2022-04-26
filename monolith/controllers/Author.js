const { Author } = require("../models");

module.exports = {
  cget: async (req, res) => {
    console.log("Get author collections");
    try {
      const authors = await Author.findAll({ where: req.query });
      res.json(authors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  post: async (req, res) => {
    try {
      const author = await Author.create(req.body);
      res.status(201).json(author);
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
      const author = await Author.findByPk(req.params.id);
      res.json(author);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  put: async (req, res) => {
    try {
      const author = await Author.findByPk(req.params.id);
      await author.update(req.body);
      res.json(author);
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
      const author = await Author.findByPk(req.params.id);
      await author.destroy();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
