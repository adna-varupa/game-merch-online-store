const Product = require('../models/Product');

// Dohvati sve proizvode
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error while fetching products:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Dohvati pojedinačni proizvod prema ID-u
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error('Error while fetching product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Dodaj novi proizvod
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, image_url } = req.body;

        const newProduct = await Product.create({ name, description, price, category, image_url });
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error while adding product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Ažuriraj postojeći proizvod
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, description, price, category, image_url } = req.body;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.update({ name, description, price, category, image_url });
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error while updating product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Obriši proizvod
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        return res.status(200).json({ message: 'Product successfully deleted' });
    } catch (error) {
        console.error('Error while deleting product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { 
    getAllProducts, 
    getProductById, 
    addProduct, 
    updateProduct, 
    deleteProduct 
};
