const Product = require('../models/Product');

// Retrieve all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Retrieve a single product by ID
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, image_url } = req.body;

        const newProduct = await Product.create({ name, description, price, category, image_url });
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Update an existing product
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
        console.error('Error updating product:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
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
