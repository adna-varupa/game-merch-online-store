// config/database.js
const { Sequelize } = require('sequelize');

// Kreiranje nove Sequelize instance
const sequelize = new Sequelize('game_merch_store', 'root', 'nestorandom', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

