// Definisanje User modela
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cart = require('./Cart');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Korisničko ime mora biti jedinstveno
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false, // Onemogući automatsko dodavanje `createdAt` i `updatedAt`
    tableName: 'users' // Ime tabele u bazi
});


module.exports = User;
