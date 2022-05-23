const { Sequelize } = require("./models");

Sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
  Sequelize.close();
});
