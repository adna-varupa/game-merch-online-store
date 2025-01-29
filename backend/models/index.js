// Bosnian: Povezivanje modela User, Product i Cart
const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');

// User može imati više korpi
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// Proizvod može biti u više korpi
Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { User, Product, Cart };
