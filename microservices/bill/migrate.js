const Sequelize = require("../lib/db");

Sequelize.sync({ alter: true }).then(() => {
	console.log("Database & tables created!");
	Sequelize.close();
});
