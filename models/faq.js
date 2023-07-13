const Sequelize = require("sequelize");
const sequelize = require("../db/database");

const faqs = sequelize.define("faqs",
{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    question: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    answer: {
        type: Sequelize.TEXT,
        allowNull: false,
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
faqs.sync();
module.exports = faqs;