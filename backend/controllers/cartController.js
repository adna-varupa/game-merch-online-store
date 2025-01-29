const Cart = require('../models/Cart'); // Import the Cart model
const Product = require('../models/Product'); // Import the Product model
const User = require('../models/User'); // Import the User model

// Fetch all cart items
const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.findAll({
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Product, attributes: ['id', 'name', 'price'] }
            ]
        });
        return res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Add a new item to the cart
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validate user and product existence
        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        if (!user || !product) {
            return res.status(404).json({ message: 'User or product not found' });
        }

        // Check if the item already exists in the cart
        let cartItem = await Cart.findOne({ where: { userId, productId } });

        if (cartItem) {
            // Update the quantity if it exists
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Create a new cart item
            cartItem = await Cart.create({ userId, productId, quantity });
        }

        return res.status(201).json(cartItem);
    } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Update cart item
const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const cartItem = await Cart.findByPk(id);

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        return res.status(200).json(cartItem);
    } catch (error) {
        console.error('Error updating cart item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Delete a cart item
const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        const cartItem = await Cart.findByPk(id);

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        await cartItem.destroy();
        return res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllCartItems,
    addToCart,
    updateCartItem,
    deleteCartItem
};
