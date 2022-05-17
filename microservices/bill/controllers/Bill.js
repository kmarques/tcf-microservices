const Bill = require("../models/Bill");
const format = require("../lib/error").formatError;
const Sequelize = require("sequelize");

module.exports = {
	cget: async (req, res) => {
		try {
			const bills = await Bill.findAll({ where: req.query });
			res.json(bills);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},

	post: async message => {
		message = JSON.parse(message.content.toString());

		console.log("Post bill");
		try {
			// on va recuperer le message succes via stripe et on le renvoie avec un status 200
			message = JSON.parse(message.content.toString());

			const order = message.order;
			const user = message.user;
			const orderProducts = order.OrderProducts;

			const bill = await Bill.create({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				billingAddress: order.shippingAddress,
				userId: order.userId,
				orderId: order.id
			});

			const data = await pdf({
				...bill.dataValues,
				orderProducts,
				user: user.dataValues
			});
			console.log(bill);
			// res.status(201).json({ bill, orderProducts });
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
