const { Order, OrderProduct } = require("../models");
const Sequelize = require("sequelize");
const startChannel = require("../lib/amqp");
const format = require("../lib/error").formatError;

const calculateOrderAmount = (order) => {
  console.log("calculateOrderAmount", order);
  return order.OrderProducts.reduce((acc, item) => {
    return acc + item.unitPrice * item.quantity;
  }, 0);
};

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
      const userId = req.headers["x-user-id"];
      const { shippingAddress } = req.body;

      const order = await Order.create({
        userId,
        shippingAddress,
      });
      console.log(req.body);

      for (const cartItem of req.body.cart) {
        console.log(cartItem.product);
        await OrderProduct.create({
          quantity: cartItem.quantity,
          unitPrice: cartItem.product.price,
          productId: cartItem.product.id,
          OrderId: order.id,
        });
      }

      res.status(201).json(order);
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        res.status(400).json(format(err));
      } else {
        console.error(err);
        res.status(500).json({ message: err.message });
      }
    }
  },

  get: async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id, {
        include: [
          {
            model: OrderProduct,
          },
        ],
      });
      if (!order) {
        res.sendStatus(404);
      } else {
        console.log("*****", calculateOrderAmount(order));
        res.json({
          ...order.dataValues,
          total: calculateOrderAmount(order),
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  update: async (message) => {
    message = JSON.parse(message.content.toString());
    console.log(message);
    try {
      const order = await Order.findByPk(message.order_id, {
        include: [
          {
            model: OrderProduct,
          },
        ],
      });

      await Order.update(
        { status: "PAID" },
        { where: { id: message.order_id } }
      );

      const channel = await startChannel();
      const queue = "create-bill";

      await channel.assertQueue(queue, {
        durable: false,
      });

      const omessage = Buffer.from(JSON.stringify(order));

      await channel.sendToQueue(queue, omessage);
      console.log(" [x] Sent %s", omessage);
    } catch (err) {
      console.log(err);
    }
  },

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
