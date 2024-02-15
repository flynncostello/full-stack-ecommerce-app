const pool = require('../config/db');

const ProductModel = {
    getAllProducts: async () => {
        try {
            const result = await pool.query('SELECT * FROM products');
            return result.rows;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
            const product = result.rows[0];
            if (product) {
                return product;
            } else {
                throw new Error('Product not found');
            }
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }
    },

    createProduct: async (productInfo) => {
        const { name, description, price, category, inventory } = productInfo;
        try {
            const result = await pool.query('INSERT INTO products (name, description, price, category, inventory) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, description, price, category, inventory]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    updateProduct: async (productId, updatedProductInfo) => {
        const { name, description, price, category, inventory } = updatedProductInfo;
        try {
            const result = await pool.query('UPDATE products SET name = $1, description = $2, price = $3, category = $4, inventory = $5 WHERE id = $6 RETURNING *', [name, description, price, category, inventory, productId]);
            const updatedProduct = result.rows[0];
            if (updatedProduct) {
                return updatedProduct;
            } else {
                throw new Error('Product not found');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        throw error;
        }
    },

    deleteProduct: async (productId) => {
        try {
            const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [productId]);
            const deletedProduct = result.rows[0];
        if (deletedProduct) {
            return deletedProduct;
        } else {
            throw new Error('Product not found');
        }
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
};

module.exports = ProductModel;
