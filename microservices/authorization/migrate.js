const sequelize = require("./models/index").sequelize;

sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
  sequelize.close();
});
