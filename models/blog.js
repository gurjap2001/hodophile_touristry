const Sequelize = require("sequelize");
const sequelize = require("../db/database");

const blogs = sequelize.define("blogs", {
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
    date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: true
    }
    },
    photo: {
    type:Sequelize.STRING,
    allowNull:false
    },
    title:{
    type:Sequelize.STRING,
    allowNull:false
    }, 
    content: {
    type:Sequelize.TEXT,
    allowNull:false
    },
    createdAt:{
    type:Sequelize.DATE,
    allowNull:true
    },
    updatedAt:{
    type:Sequelize.DATE,
    allowNull:true
    },
} 
)

module.exports = blogs;