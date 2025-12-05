
const { Sequelize } = require('sequelize');


const DB_NAME = 'school_management';
const DB_USER = 'user8';
const DB_PASS = 'COd1ngF@';
const DB_HOST = 'localhost';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',       
  logging: false,         
});

module.exports = sequelize;