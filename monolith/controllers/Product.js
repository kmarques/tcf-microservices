const { Product, ProductAuthor ,  sequelize } = require("../models");

module.exports = {
  cget: async (req, res) => {
    console.log("Get product collections");
    try {
      const products = await Product.findAll({ where: req.query });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  post: async (req, res) => {
    const t = await sequelize.transaction();

    try {
      const product = await Product.create(req.body, { transaction: t });      
      for (const authorId of req.body.AuthorsId) {
        const productAuthor = await ProductAuthor.create({
          ProductId: product.id,
          AuthorId: authorId,
        }, { transaction: t });
        console.log(productAuthor);
      }
      await t.commit();
      res.status(201).json(product);
    } 
    catch (err) {
      console.error(err);
      await t.rollback();
      if (err instanceof sequelize.ValidationError) {
        res.status(400).json(format(err));
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  },

  get: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  put: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      await product.update(req.body);
      res.json(product);
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
      const product = await Product.findByPk(req.params.id);
      await product.destroy();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
