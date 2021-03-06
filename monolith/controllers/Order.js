const { Order, Product } = require("../models");
const OrderProduct = require("../models/OrderProduct");
const Sequelize = require("sequelize");
const format = require("../lib/error").formatError;

module.exports = {
  cget: async (req, res) => {
    console.log("Get order collections");
    try {
      const orders = await Order.findAll({ where: req.query });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  post: async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { shippingAddress } = req.body;
      const order = await Order.create({
        UserId: userId,
        shippingAddress,
      });

      const products = await Product.findAll({
        where: {
          id: {
            [Sequelize.Op.in]: req.body.cart.map((item) => item.productId),
          },
        },
      });
      // console.log("ODRER ID", order.id);
      for (const cartItem of req.body.cart) {
        // item.productId, item.quantity,
        // const product = await Product.findByPk(cartItem.productId);
        const product = products.find((t) => t.id == cartItem.productId);
        if (!product) {
          throw new Sequelize.ValidationError("Product not found", [
            new Sequelize.ValidationErrorItem(
              `Product ${cartItem.productId} not found`,
              "cart",
              cartItem.productId,
              null,
              null,
              null,
              null
            ),
          ]);
        }
        await OrderProduct.create({
          quantity: cartItem.quantity,
          unitPrice: product.price,
          ProductId: product.id,
          OrderId: order.id,
        });
      }
      res.status(201).json(order);
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
      const order = await Order.findByPk(req.params.id);
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // put: async (req, res) => {
  //   try {
  //     const order = await Order.findByPk(req.params.id);
  //     await order.update(req.body);
  //     res.json(order);
  //   } catch (err) {
  //     if (err instanceof Sequelize.ValidationError) {
  //       res.status(400).json(format(err));
  //     } else {
  //       res.status(500).json({ message: err.message });
  //     }
  //   }
  // },

  // delete: async (req, res) => {
  //   try {
  //     const order = await Order.findByPk(req.params.id);
  //     await order.destroy();
  //     res.status(204).end();
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // },
};
