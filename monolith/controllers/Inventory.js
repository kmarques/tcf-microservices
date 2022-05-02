const { Inventory, sequelize } = require("../models");

//delete method 
module.exports = {
delete : async function deleteInventory(req, res) {
    await Inventory.destroy({ 
        where: {
            id: req.params.stockId
        }
    });
    res.status(204).end();
},
    post : async (req, res) => {
        try {
        const inventory = await Inventory.create({...req.body, ProductId: req.params.id});
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
    const quantity = await sequelize.query('SELECT product_id, SUM(quantity) as quantity FROM inventory WHERE product_id = :product_id group by product_id', {
    replacements: {
        product_id: req.params.id
    },
    type: sequelize.QueryTypes.SELECT
   })
   res.json(quantity[0]);
},

cget: async (req, res) => {
    console.log("Get user collections");
    try {
      const users = await Inventory.findAll({ where: {...req.query, ProductId: req.params.id} });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

removeExpired : async() => {
    const inventory = await sequelize.query('DELETE FROM inventory WHERE date < DATE_SUB(NOW(), INTERVAL 15 MINUTES)', {
        type: sequelize.QueryTypes.DELETE
    })
    return inventory;

}

}