const express = require('express');
const router = express.Router();

const productController = require('../controllers/product_controller');

// PRODUCTS //
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
