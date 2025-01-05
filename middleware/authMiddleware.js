const authenticate = require('./authMiddleware'); // Import authentication middleware

const getAllCartItems = async (req, res) => {
    try {
        // You now have access to the logged-in user's ID via req.user.id
        const cartItems = await Cart.findAll({
            where: { userId: req.user.id }, // Fetch cart items for the logged-in user
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Product, attributes: ['id', 'name', 'price'] }
            ]
        });
        return res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Protect the route with authentication middleware
app.get('/api/cart', authenticate, getAllCartItems);
