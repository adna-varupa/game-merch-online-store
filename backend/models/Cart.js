const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ažuriraj sa svojom Sequelize instancom

class Cart extends Model {}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'user_id', // Mapira se na kolonu 'user_id' u bazi
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            field: 'product_id', // Mapira se na kolonu 'product_id' u bazi
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at', // Mapira se na 'created_at' u bazi
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at', // Mapira se na 'updated_at' u bazi
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Cart',
        tableName: 'cart', // Poklapa se sa imenom tabele
        timestamps: true, // Omogućava automatsko upravljanje 'createdAt' i 'updatedAt'
    }
);

module.exports = Cart;
