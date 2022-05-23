const { sequelize } = require("./models");

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
  sequelize.close();
});
