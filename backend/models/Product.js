// Definisanje Product modela
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cart = require('./Cart');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING
    },
    image_url: {
        type: DataTypes.STRING
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
    tableName: 'products' // Ime tabele u bazi
});



module.exports = Product;
