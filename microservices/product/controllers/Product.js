const { Product, sequelize } = require("../models");
const format = require("../lib/error").formatError;
const Sequelize = require("sequelize");

module.exports = {
  cget: async (req, res) => {
    console.log("Get product collections");
    try {
      const products = await Product.findAll({
        where: req.query,
        include: ["authors"],
      });
      console.log(products[0]);
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  post: async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const product = await Product.create(req.body, {
        transaction: t,
      });
      for (const authorId of req.body.authors) {
        await product.addAuthor(authorId, { transaction: t });
      }
      await t.commit();
      res.status(201).json(product);
    } catch (err) {
      console.error(err, typeof err);
      await t.rollback();
      if (err instanceof Sequelize.ValidationError) {
        res.status(400).json(format(err));
      } else if (err instanceof Sequelize.ForeignKeyConstraintError) {
        res.status(400).json({ [err.index]: err.original.detail });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  },

  get: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        res.sendStatus(404);
      } else {
        res.json(product);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  put: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.sendStatus(404);
      }
      await product.update(req.body);
      res.json(product);
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        res.status(400).json(format(err));
      } else if (err instanceof Sequelize.ForeignKeyConstraintError) {
        res.status(400).json({ [err.index]: err.original.detail });
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  },

  delete: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.sendStatus(404);
      }
      await product.destroy();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
