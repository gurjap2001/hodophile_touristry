const Sequelize = require("sequelize");

const sequelize = new Sequelize("user_management", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;