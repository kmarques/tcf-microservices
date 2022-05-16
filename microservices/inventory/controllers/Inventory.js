const { Inventory, sequelize } = require("../models");

//delete method
module.exports = {
  delete: async function deleteInventory(req, res) {
    await Inventory.destroy({
      where: {
        id: req.params.stockId,
      },
    });
    res.status(204).end();
  },
  post: async (req, res) => {
    try {
      const inventory = await Inventory.create({
        ...req.body,
        ProductId: req.params.id,
      });
      res.status(201).json(inventory);
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        res.status(400).json(format(err));
      } else {
        res.status(500).json({ message: err.message });
      }
    }
  },

  //add method
  quantity: async (req, res) => {
    console.log(req.params);
    const quantity = await sequelize.query(
      'SELECT SUM(quantity) as quantity FROM "Inventories" WHERE "ProductId" = :product_id group by "ProductId"',
      {
        replacements: {
          product_id: parseInt(req.params.id),
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    console.log(quantity);
    res.json(
      quantity.length
        ? quantity[0]
        : {
            quantity: 0,
          }
    );
  },

  cget: async (req, res) => {
    console.log("Get user collections");
    try {
      const users = await Inventory.findAll({
        where: { ...req.query, ProductId: parseInt(req.params.id) },
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  removeExpired: async () => {
    const inventory = await sequelize.query(
      'DELETE FROM "Inventories" WHERE "createdAt" < (NOW() - INTERVAL \'1 MINUTES\') AND "typeEvent" = \'RESERVATION\'',
      {
        type: sequelize.QueryTypes.DELETE,
      }
    );
    return inventory;
  },
};