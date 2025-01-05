const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Update with your Sequelize instance

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
            field: 'user_id', // Maps to the database column 'user_id'
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            field: 'product_id', // Maps to the database column 'product_id'
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at', // Maps to 'created_at' in the database
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at', // Maps to 'updated_at' in the database
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Cart',
        tableName: 'cart', // Match the table name
        timestamps: true, // Enables automatic handling of 'createdAt' and 'updatedAt'
    }
);

module.exports = Cart;
