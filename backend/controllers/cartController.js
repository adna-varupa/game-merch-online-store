const Cart = require('../models/Cart'); // Uvoz modela Cart
const Product = require('../models/Product'); // Uvoz modela Product
const User = require('../models/User'); // Uvoz modela User

// Dohvati sve stavke iz korpe
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
        console.error('Greška prilikom dohvaćanja stavki iz korpe:', error);
        return res.status(500).json({ message: 'Greška na serveru' });
    }
};

// Dodaj novu stavku u korpu
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validacija postojanja korisnika i proizvoda
        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        if (!user || !product) {
            return res.status(404).json({ message: 'Korisnik ili proizvod nisu pronađeni' });
        }

        // Provjera da li stavka već postoji u korpi
        let cartItem = await Cart.findOne({ where: { userId, productId } });

        if (cartItem) {
            // Ažuriraj količinu ako stavka postoji
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Kreiraj novu stavku u korpi
            cartItem = await Cart.create({ userId, productId, quantity });
        }

        return res.status(201).json(cartItem);
    } catch (error) {
        console.error('Greška prilikom dodavanja u korpu:', error);
        return res.status(500).json({ message: 'Greška na serveru' });
    }
};

// Ažuriraj stavku u korpi
const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const cartItem = await Cart.findByPk(id);

        if (!cartItem) {
            return res.status(404).json({ message: 'Stavka u korpi nije pronađena' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        return res.status(200).json(cartItem);
    } catch (error) {
        console.error('Greška prilikom ažuriranja stavke u korpi:', error);
        return res.status(500).json({ message: 'Greška na serveru' });
    }
};

// Obriši stavku iz korpe
const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        const cartItem = await Cart.findByPk(id);

        if (!cartItem) {
            return res.status(404).json({ message: 'Stavka u korpi nije pronađena' });
        }

        await cartItem.destroy();
        return res.status(200).json({ message: 'Stavka iz korpe uspješno obrisana' });
    } catch (error) {
        console.error('Greška prilikom brisanja stavke iz korpe:', error);
        return res.status(500).json({ message: 'Greška na serveru' });
    }
};

module.exports = {
    getAllCartItems,
    addToCart,
    updateCartItem,
    deleteCartItem
};
