const Sequelize = require("sequelize");
const sequelize = require("../db/database");
const bcrypt = require('bcrypt');
// const createHttpError = require('http-errors');
//const { roles } = require('../utils/constants');

const user = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique:true,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  mobile: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  gender:{
  type: Sequelize.STRING,
   allowNull:true
  },
  disability:{
    type:Sequelize.INTEGER,
    allowNull: true,
  },
  allergies:{
    type:Sequelize.TEXT,
    allowNull:true
  },
  address:{
    type:Sequelize.TEXT,
    allowNull:true
  },
  profile_image:{
    type:Sequelize.TEXT,
    allowNull:true
  }
} 
)
module.exports = user;