const authenticate = require('./authMiddleware'); // Uvoz autentifikacijskog middleware-a

const getAllCartItems = async (req, res) => {
    try {
        // Sada imate pristup ID-u prijavljenog korisnika putem req.user.id
        const cartItems = await Cart.findAll({
            where: { userId: req.user.id }, // Dohvati stavke u korpi za prijavljenog korisnika
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Product, attributes: ['id', 'name', 'price'] }
            ]
        });
        return res.status(200).json(cartItems);
    } catch (error) {
        console.error("Greška prilikom dohvaćanja stavki u korpi:", error);
        return res.status(500).json({ message: 'Greška servera' });
    }
};

// Zaštiti rutu autentifikacijskim middleware-om
app.get('/api/cart', authenticate, getAllCartItems);
