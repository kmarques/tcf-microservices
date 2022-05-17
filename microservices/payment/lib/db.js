const Sequelize = require("sequelize");

const connection = new Sequelize(process.env.DATABASE_URL);

connection.authenticate().then(() => {
  console.log("Connection to payment db has been established successfully.");
});

module.exports = connection;
