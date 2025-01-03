// config/database.js
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('game_merch_store', 'root', 'nestorandom', {
  host: 'localhost',
  dialect: 'mysql', // Or 'postgres', based on your DB
});

module.exports = sequelize;
