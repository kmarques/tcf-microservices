const { Order, Product } = require("../models");
const Sequelize = require("sequelize");
let amqp = require("amqplib/callback_api");

const calculateOrderAmount = async order => {
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
			const userId = req.headers["X-User-Id"];
			const { shippingAddress, firstname, lastname, email } = req.body;

			const order = await Order.create({
				UserId: userId
			});

			const products = await Product.findAll({
				where: {
					id: {
						[Sequelize.Op.in]: req.body.cart.map(item => item.productId)
					}
				}
			});
			// console.log("ODRER ID", order.id);
			for (const cartItem of req.body.cart) {
				// item.productId, item.quantity,
				// const product = await Product.findByPk(cartItem.productId);
				const product = products.find(t => t.id == cartItem.productId);

				await OrderProduct.create({
					quantity: cartItem.quantity,
					unitPrice: product.price,
					ProductId: product.id,
					OrderId: order.id
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
			const order = await Order.findByPk(req.params.id, {
				include: [
					{
						model: OrderProduct
					}
				]
			});
			res.json({
				...order,
				total: calculateOrderAmount(order)
			});
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},

	update: async message => {
		message = JSON.parse(message.content.toString());

		try {
			const order = await Order.findByPk(message.orderId, {
				include: [
					{
						model: OrderProduct
					}
				]
			});

			amqp.connect(
				"amqp://myuser:mypassword@rabbitmq",
				function (error0, connection) {
					if (error0) {
						throw error0;
					}
					connection.createChannel(function (error1, channel) {
						if (error1) {
							throw error1;
						}
						const queue = "create-bill";

						channel.assertQueue(queue, {
							durable: false
						});

						const message = Buffer.from(JSON.stringify(order));

						channel.sendToQueue(queue, message);
						console.log(" [x] Sent %s", message.toString());

						// channel.consume(queue, Order.update);
					});
					// setTimeout(function () {
					// 	connection.close();
					// 	process.exit(0);
					// }, 500);
				}
			);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	}

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
