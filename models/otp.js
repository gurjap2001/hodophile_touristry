const Sequelize = require("sequelize");
const sequelize = require("../db/database");

const otp = sequelize.define("otp", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  otp: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
 expiredAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
 createdAt:{
    type:Sequelize.DATE,
    allowNull:false
 },
 updatedAt:{
    type:Sequelize.DATE,
    allowNull:false
 },
} 
)
//otp.sync();
module.exports = otp;