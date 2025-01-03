const { DataTypes, Model } = require('sequelize');  // Import Model from sequelize
const sequelize = require('../config/database'); 
const Product = require('./Product');
const User = require('./User');

class Cart extends Model {}

Cart.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',  // Ensure the model name matches the actual table name
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',  // Ensure the model name matches the actual table name
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    sequelize,   // Reference to the sequelize instance
    modelName: 'Cart', // The name of the model
    tableName: 'carts', // Ensure this matches your table name in the DB
    timestamps: true  // Enable automatic createdAt/updatedAt fields
});



module.exports = Cart;
