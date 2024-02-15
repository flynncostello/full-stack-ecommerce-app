const express = require('express');
const router = express.Router();

const userController = require('../controllers/user/user_controller');
const userAddressesController = require('../controllers/user/user_addresses_controller');
const userPaymentsController = require('../controllers/user/user_payments_controller');
const userShoppingCartController = require('../controllers/user/user_shopping_carts_controller');
const userOrdersController = require('../controllers/user/user_orders_controller');

// USER ADDRESS //
router.get('/:userId/address', userAddressesController.getAddressByUserId);
router.get('/addresses', userAddressesController.getAddressesAllUsers);
router.post('/:userId/address', userAddressesController.createAddress);
router.put('/:userId/address', userAddressesController.updateAddress);
router.delete('/:userId/address', userAddressesController.deleteAddress);

// USER PAYMENT METHODS //
router.get('/:userId/paymentMethods', userPaymentsController.getAllUserPaymentMethods);
router.get('/:userId/paymentMethods/:paymentId', userPaymentsController.getUserPaymentMethodById);
router.post('/:userId/paymentMethods', userPaymentsController.createUserPaymentMethod);
router.put('/:userId/paymentMethods/:paymentId', userPaymentsController.updatePaymentMethod);
router.delete('/:userId/paymentMethods/:paymentId', userPaymentsController.deletePaymentMethod);

// USER CART //
router.get('/:userId/cart', userShoppingCartController.getUserShoppingCarById);
router.post('/:userId/cart', userShoppingCartController.createUserShoppingCart);
router.put('/:userId/cart', userShoppingCartController.updateShoppingCart);
router.delete('/:userId/cart', userShoppingCartController.deleteShoppingCart);

router.get('/:userId/cart/:cartId/items', userShoppingCartController.getCartItems);
router.get('/:userId/cart/:cartId/items/:productId', userShoppingCartController.getCartItemById);
router.post('/:userId/cart/:cartId/items', userShoppingCartController.createCartItem);
router.put('/:userId/cart/:cartId/items/:productId', userShoppingCartController.updateCartItem);
router.delete('/:userId/cart/:cartId/items/:productId', userShoppingCartController.deleteCartItem);

// USER ORDERS //
router.get('/:userId/orders', userOrdersController.getUserOrders);
router.get('/:userId/orders/:orderId', userOrdersController.getUserOrder);
router.post('/:userId/orders', userOrdersController.createOrder);
router.put('/:userId/orders/:orderId', userOrdersController.updateOrder);
router.delete('/:userId/orders/:orderId', userOrdersController.deleteOrder);

router.get('/:userId/orders/:orderId/status', userOrdersController.getUserOrderStatus);
router.put('/:userId/orders/:orderId/status', userOrdersController.updateUserOrderStatus);
router.post('/:userId/orders/:orderId/status', userOrdersController.createUserOrderStatus);

router.get('/:userId/orders/:orderId/items', userOrdersController.getUserOrderItems);
router.post('/:userId/orders/:orderId/items', userOrdersController.createOrderItem);

// USERS //
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
