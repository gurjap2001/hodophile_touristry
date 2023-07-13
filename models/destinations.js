const Sequelize = require("sequelize");
const sequelize = require("../db/database");

const destinations = sequelize.define("destinations", {
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
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true,
},
city: {
type: Sequelize.STRING,    
allowNull: true,
},
startdate: {
    type: Sequelize.DATE,
    allowNull:false
},
enddate:{
    type: Sequelize.DATE,
    allowNull:false
},
images:{
  type: Sequelize.STRING,
  allowNull: true
},
multi_images:{
  type: Sequelize.TEXT,
  allowNull: true
},
includes:{
  type: Sequelize.TEXT,
  allowNull:false
},
excludes:{
  type: Sequelize.TEXT,
  allowNull:false
},
descriptionbox:{
  type: Sequelize.TEXT,
  allowNull: true
},
additionalinfo:{
   type: Sequelize.TEXT,
   allowNull: true
}
}
,
{
  timestamps:false
}

);
//destinations.sync();

module.exports = destinations;
