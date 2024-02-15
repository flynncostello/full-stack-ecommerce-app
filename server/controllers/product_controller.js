const productModel = require('../models/product_model');

// products //
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getProductById = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await productModel.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
};

exports.createProduct = async (req, res) => {
    const productData = req.body;
    try {
        const newProduct = await productModel.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const updatedProductData = req.body;
    try {
        const updatedProduct = await productModel.updateProduct(productId, updatedProductData);
        res.json(updatedProduct);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        const deletedProduct = await productModel.deleteProduct(productId);
        res.json(deletedProduct);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
};
