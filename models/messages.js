const Sequelize = require("sequelize");
const sequelize = require("../db/database");

const messages = sequelize.define("messages",
{
    id:{
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
        allowNull: false,
    },
    subject:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    message:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    createdAt:{
        type:Sequelize.DATE,
        allowNull:false
    },
    updatedAt:{
        type: Sequelize.DATE,
        allowNull: false
    }
})
module.exports = messages;