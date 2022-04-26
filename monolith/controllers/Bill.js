const { Bill } = require("../models");

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
      const {userId} = req.user;
      const {shippingAddress} = req.body;
      // Create Bill
      const bill = await Bill.create({
        userId,
        shippingAddress,
      });
      res.status(201).json(bill);
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

  // delete: async (req, res) => {
  //   try {
  //     const bill = await Bill.findByPk(req.params.id);
  //     await bill.destroy();
  //     res.status(204).end();
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // },
};
