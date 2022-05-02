const { Bill, Order, User } = require("../models");
const OrderProduct = require("../models/OrderProduct");
const pdf = require("../lib/pdf");

module.exports = {
	cget: async (req, res) => {
		console.log("Get bill collections");
		try {
			const bills = await Bill.findAll({ where: req.query });
			res.json(bills);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},

	post: async (req, res) => {
		try {
			const { orderId } = req.body;
			// Create Bill
			const order = await Order.findByPk(orderId);
			const user = await User.findByPk(order.UserId);

			// Create OrderProducts
			const orderProducts = await OrderProduct.findAll({
				where: { OrderId: orderId }
			});

			const bill = await Bill.create({
				path: "https://www.google.com",
				billingAddress: order.shippingAddress,
				UserId: order.UserId,
				OrderId: orderId
			});

			pdf({ ...bill.dataValues, orderProducts, user: user.dataValues })
				.then(data => {
					console.log(data);
					res.json(data);
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({ message: err.message });
				});

			// res.status(201).json({ bill, orderProducts });
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
			const bill = await Bill.findByPk(req.params.id);
			res.json(bill);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},

	// put: async (req, res) => {
	//   try {
	//     const bill = await Bill.findByPk(req.params.id);
	//     await bill.update(req.body);
	//     res.json(bill);
	//   } catch (err) {
	//     if (err instanceof Sequelize.ValidationError) {
	//       res.status(400).json(format(err));
	//     } else {
	//       res.status(500).json({ message: err.message });
	//     }
	//   }
	// },
	delete: async (req, res) => {
		try {
			const bill = await Bill.findByPk(req.params.id);
			await bill.destroy();
			res.status(204).end();
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	}
};
