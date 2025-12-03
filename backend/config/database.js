// backend/config/database.js
const { Sequelize } = require('sequelize');

// ⚠️ change these to your local DB credentials
const DB_NAME = 'school_management';
const DB_USER = 'user8';
const DB_PASS = 'COd1ngF@';
const DB_HOST = 'localhost';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',       // or 'postgres'
  logging: false,         // set true if you want SQL logs
});

module.exports = sequelize;