const Sequelize = require("sequelize");
const sequelize = require("../db/database");

const bookings = sequelize.define("bookings", {
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
    allowNull: false,
    },
    price:{
        type:Sequelize.STRING,
        allowNull: false
    },
    payment_status:{
        type:Sequelize.BOOLEAN,
        allowNull:true
    },
    no_of_person:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    dest_id:{
        type:Sequelize.STRING,
        allowNull: false
    },
    createdAt:{
    type:Sequelize.DATE,
    allowNull:false
    },
    updatedAt:{
        type:Sequelize.DATE,
        allowNull:false
    }
});
module.exports = bookings;




